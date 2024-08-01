package com.tasklion.backend.features.taskerService.serviceArea.service;

import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.features.taskerService.serviceArea.ServiceArea;
import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaModel;
import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaRequestModel;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface ServiceAreaService {

    void deleteServiceArea(Long id);

    Page<ServiceAreaModel> getServiceAreas(String username, PaginationModel paginationModel);

    List<ServiceAreaModel> getServiceAreas(String username);

    Map<String, Map<String, List<String>>> getServiceAreaOptions(String username);

    ServiceAreaModel createServiceArea(String username, ServiceAreaModel serviceAreaModel);

    ServiceAreaModel updateServiceArea(Long id, ServiceAreaModel serviceAreaModel);

    ServiceAreaModel getServiceArea(Long serviceAreaId);

    ServiceArea getServiceArea(ServiceAreaRequestModel serviceAreaRequestModel);

}
