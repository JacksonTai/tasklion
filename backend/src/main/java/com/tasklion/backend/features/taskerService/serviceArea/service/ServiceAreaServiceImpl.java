package com.tasklion.backend.features.taskerService.serviceArea.service;

import com.querydsl.core.BooleanBuilder;
import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.common.util.PageUtil;
import com.tasklion.backend.features.taskerService.serviceArea.QServiceArea;
import com.tasklion.backend.features.taskerService.serviceArea.ServiceArea;
import com.tasklion.backend.features.taskerService.serviceArea.ServiceAreaMapper;
import com.tasklion.backend.features.taskerService.serviceArea.ServiceAreaRepo;
import com.tasklion.backend.features.taskerService.serviceArea.exception.ServiceAreaException;
import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaModel;
import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaRequestModel;
import com.tasklion.backend.features.tasklionUser.tasker.Tasker;
import com.tasklion.backend.features.tasklionUser.tasker.TaskerMapper;
import com.tasklion.backend.features.tasklionUser.tasker.TaskerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ServiceAreaServiceImpl implements ServiceAreaService {

    private final ServiceAreaRepo serviceAreaRepo;
    private final TaskerRepo taskerRepo;

    private final TaskerMapper taskerMapper;

    @Override
    public void deleteServiceArea(Long id) {
        serviceAreaRepo.deleteById(id);
    }

    @Override
    public Page<ServiceAreaModel> getServiceAreas(String username, PaginationModel paginationModel) {
        return serviceAreaRepo.findByTaskerTasklionAccountUsername(username, PageUtil.getPageable(paginationModel))
                .map(ServiceAreaMapper.INSTANCE::toModel);
    }

    @Override
    public List<ServiceAreaModel> getServiceAreas(String username) {
        List<ServiceArea> serviceAreas = serviceAreaRepo.findByTaskerTasklionAccountUsername(username);
        return serviceAreas.stream().map(ServiceAreaMapper.INSTANCE::toModel).toList();
    }

    @Override
    public Map<String, Map<String, List<String>>> getServiceAreaOptions(String username) {
        return serviceAreaRepo.findByTaskerTasklionAccountUsername(username).stream()
                .collect(Collectors.groupingBy(
                        ServiceArea::getState,
                        Collectors.groupingBy(
                                ServiceArea::getCity,
                                Collectors.mapping(ServiceArea::getPostcode, Collectors.toList())
                        )
                ));
    }

    @Override
    public ServiceAreaModel createServiceArea(String username, ServiceAreaModel serviceAreaModel) {
        Tasker tasker = taskerRepo.findByTasklionAccountUsername(username).orElseThrow(() -> new RuntimeException("Tasker not found"));
        serviceAreaModel.setTasker(taskerMapper.toModel(tasker));
        if (serviceAreaRepo.exists(getServiceAreaBooleanBuilder(serviceAreaModel))) {
            throw new ServiceAreaException("Service Area already exists");
        }
        ServiceArea serviceArea = ServiceAreaMapper.INSTANCE.toEntity(serviceAreaModel);
        serviceArea.setTasker(tasker);
        return ServiceAreaMapper.INSTANCE.toModel(serviceAreaRepo.save(serviceArea));
    }

    @Override
    public ServiceAreaModel updateServiceArea(Long id, ServiceAreaModel serviceAreaModel) {
        ServiceArea serviceArea = serviceAreaRepo.findById(id).orElseThrow(() -> new RuntimeException("Service Area not found"));
        serviceAreaModel.setTasker(taskerMapper.toModel(serviceArea.getTasker()));
        if (serviceAreaRepo.exists(getServiceAreaBooleanBuilder(serviceAreaModel))) {
            throw new ServiceAreaException("Service Area already exists");
        }
        serviceArea.setState(serviceAreaModel.getState());
        serviceArea.setCity(serviceAreaModel.getCity());
        serviceArea.setPostcode(serviceAreaModel.getPostcode());
        return ServiceAreaMapper.INSTANCE.toModel(serviceAreaRepo.save(serviceArea));
    }

    @Override
    public ServiceAreaModel getServiceArea(Long serviceAreaId) {
        return serviceAreaRepo.findById(serviceAreaId)
                .map(ServiceAreaMapper.INSTANCE::toModel)
                .orElseThrow(() -> new RuntimeException("Service Area not found"));
    }

    @Override
    public ServiceArea getServiceArea(ServiceAreaRequestModel serviceAreaRequestModel) {
        return serviceAreaRepo.findOne(getServiceAreaBooleanBuilder(serviceAreaRequestModel))
                .orElseThrow(() -> new RuntimeException("Service Area not found"));
    }

    private BooleanBuilder getServiceAreaBooleanBuilder(ServiceAreaModel serviceAreaModel) {
        return getServiceAreaBooleanBuilder(ServiceAreaRequestModel.builder()
                .serviceAreaModel(serviceAreaModel)
                .username(serviceAreaModel.getTasker().getTasklionAccount().getUsername())
                .build());
    }

    private BooleanBuilder getServiceAreaBooleanBuilder(ServiceAreaRequestModel serviceAreaRequestModel) {
        BooleanBuilder builder = new BooleanBuilder();
        ServiceAreaModel serviceAreaModel = serviceAreaRequestModel.getServiceAreaModel();
        if (serviceAreaModel.getState() != null) {
            builder.and(QServiceArea.serviceArea.state.eq(serviceAreaModel.getState()));
        }
        if (serviceAreaModel.getCity() != null) {
            builder.and(QServiceArea.serviceArea.city.eq(serviceAreaModel.getCity()));
        }
        if (serviceAreaModel.getPostcode() != null) {
            builder.and(QServiceArea.serviceArea.postcode.eq(serviceAreaModel.getPostcode()));
        }
        if (serviceAreaRequestModel.getUsername() != null) {
            builder.and(QServiceArea.serviceArea.tasker.tasklionAccount.username.eq(serviceAreaRequestModel.getUsername()));
        }
        return builder;
    }

}
