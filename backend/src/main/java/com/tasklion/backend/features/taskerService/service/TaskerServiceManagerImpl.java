package com.tasklion.backend.features.taskerService.service;

import com.tasklion.backend.common.exception.ResourceNotFoundException;
import com.tasklion.backend.common.model.KeyValueModel;
import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.common.util.MathUtil;
import com.tasklion.backend.common.util.PageUtil;
import com.tasklion.backend.features.task.TaskRepo;
import com.tasklion.backend.features.task.TaskStatus;
import com.tasklion.backend.features.taskerService.TaskerService;
import com.tasklion.backend.features.taskerService.TaskerServiceMapper;
import com.tasklion.backend.features.taskerService.TaskerServiceRepo;
import com.tasklion.backend.features.taskerService.exception.TaskerServiceException;
import com.tasklion.backend.features.taskerService.model.CreateTaskerServiceRequestModel;
import com.tasklion.backend.features.taskerService.model.TaskerServiceModel;
import com.tasklion.backend.features.taskerService.serviceCategory.ServiceCategory;
import com.tasklion.backend.features.taskerService.serviceCategory.service.ServiceCategoryService;
import com.tasklion.backend.features.taskerService.serviceReview.ServiceReview;
import com.tasklion.backend.features.taskerService.serviceReview.model.RatingDetailModel;
import com.tasklion.backend.features.tasklionUser.tasker.Tasker;
import com.tasklion.backend.features.tasklionUser.tasker.TaskerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TaskerServiceManagerImpl implements TaskerServiceManager {

    private final TaskRepo taskRepo;
    private final TaskerRepo taskerRepo;
    private final TaskerServiceRepo taskerServiceRepo;
    private final ServiceCategoryService serviceCategoryService;
    private final TaskerServiceMapper taskerServiceMapper;

    @Override
    public Page<TaskerServiceModel> getTaskerServices(PaginationModel paginationModel) {
        return taskerServiceRepo.findAll(PageUtil.getPageable(paginationModel)).map(TaskerServiceMapper.INSTANCE::toModel);
    }

    @Override
    public Page<TaskerServiceModel> getTaskerServicesByUsername(String username, PaginationModel paginationModel) {
        return taskerServiceRepo.findTaskerServicesByTaskerTasklionAccountUsername(username, PageUtil.getPageable(paginationModel))
                .map(taskerServiceMapper::toModel);
    }

    @Override
    public List<KeyValueModel<Long>> getMostOfferedTaskerServices() {
        Map<ServiceCategory, Long> serviceCountMap = taskerServiceRepo.findAll().stream()
                .collect(Collectors.groupingBy(TaskerService::getCategory, Collectors.counting()));
        List<Map.Entry<ServiceCategory, Long>> sortedServiceCountList = serviceCountMap.entrySet().stream()
                .sorted(Map.Entry.<ServiceCategory, Long>comparingByValue().reversed())
                .limit(5)
                .toList();
        return sortedServiceCountList.stream()
                .map(entry -> KeyValueModel.<Long>builder()
                        .field(entry.getKey().getName())
                        .value(entry.getValue())
                        .build())
                .toList();
    }

    @Override
    public TaskerServiceModel getTaskerServiceById(long id) {
        return taskerServiceRepo.findById(id)
                .map(taskerServiceMapper::toModel)
                .orElseThrow(() -> new ResourceNotFoundException("Tasker service not found"));
    }

    @Override
    public Double getOverallRating(TaskerService taskerService) {
        return MathUtil.round(taskerService.getReviews().stream()
                .mapToDouble(ServiceReview::getRating).average()
                .orElse(0.0), 1);
    }

    @Override
    public Double getOverallRatingById(Long id) {
        return taskerServiceRepo.findById(id).map(this::getOverallRating).orElse(0.0);
    }

    @Override
    public RatingDetailModel getTaskerServiceRatingDetailById(Long id) {
        TaskerService taskerService = taskerServiceRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tasker service not found"));
        return RatingDetailModel.builder()
                .overallRating(getOverallRating(taskerService))
                .totalReviews(taskerService.getReviews().size())
                .build();
    }

    @Override
    public List<Long> createTaskerServices(CreateTaskerServiceRequestModel createTaskerServiceRequestModel) {
        String username = createTaskerServiceRequestModel.getUsername();
        List<TaskerServiceModel> taskerServiceModels = createTaskerServiceRequestModel.getTaskerServiceModels();
        Tasker tasker = taskerRepo.findByTasklionAccountUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Tasker not found"));
        return addServicesToTasker(tasker, taskerServiceModels);
    }

    @Override
    public List<Long> addServicesToTasker(Tasker tasker, List<TaskerServiceModel> taskerServicesModels) {
        return taskerServicesModels.stream().map(taskerServiceModel -> {
            ServiceCategory serviceCategory = serviceCategoryService.saveServiceCategory(taskerServiceModel.getCategory());
            if (tasker.getServices().stream().anyMatch(taskerService -> taskerService.getCategory().equals(serviceCategory))) {
                throw new TaskerServiceException("You already have the same service category");
            }
            TaskerService taskerService = TaskerService.builder()
                    .tasker(tasker)
                    .description(taskerServiceModel.getDescription())
                    .category(serviceCategory)
                    .build();
            return taskerServiceRepo.save(taskerService).getId();
        }).collect(Collectors.toList());
    }

    @Override
    public TaskerServiceModel updateTaskerService(Long id, TaskerServiceModel taskerServiceModel) {
        TaskerService taskerService = taskerServiceRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tasker service not found"));
        taskerService.setDescription(taskerServiceModel.getDescription());
        taskerServiceRepo.save(taskerService);
        return taskerServiceMapper.toModel(taskerService);
    }

    @Override
    public void deleteTaskerService(Long id) {
        TaskerService taskerService = taskerServiceRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tasker service not found"));
        List<String> statuses = List.of(TaskStatus.COMPLETED.name(), TaskStatus.CANCELLED.name());
        if (taskRepo.existsByTaskerServiceIdAndStatusNotIn(id, statuses)) {
            throw new TaskerServiceException("Cannot delete TaskerService as there are existing tasks associated with it");
        }
        taskerServiceRepo.delete(taskerService);
    }

}
