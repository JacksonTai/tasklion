package com.tasklion.backend.features.taskerService.serviceReview.service;

import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.features.taskerService.serviceReview.model.AddServiceReviewRequestModel;
import com.tasklion.backend.features.taskerService.serviceReview.model.ServiceReviewModel;
import org.springframework.data.domain.Page;

public interface ServiceReviewService {

    Page<ServiceReviewModel> getReviewsByTaskerServiceId(Long taskerServiceId, PaginationModel paginationModel);

    Long createServiceReview(AddServiceReviewRequestModel addServiceReviewRequestModel);

}
