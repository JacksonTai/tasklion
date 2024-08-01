package com.tasklion.backend.features.taskerService.serviceReview;

import com.tasklion.backend.common.constant.ApiEndpoint;
import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.common.model.api.SuccessResponseModel;
import com.tasklion.backend.features.taskerService.serviceReview.model.AddServiceReviewRequestModel;
import com.tasklion.backend.features.taskerService.serviceReview.model.ServiceReviewModel;
import com.tasklion.backend.features.taskerService.serviceReview.service.ServiceReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}" + ApiEndpoint.SERVICE_REVIEW)
public class ServiceReviewController {

    private final ServiceReviewService serviceReviewService;

    @PostMapping("/{taskerServiceId}")
    public ResponseEntity<SuccessResponseModel<Page<ServiceReviewModel>>> getReviewsByTaskerServiceId(
            @PathVariable Long taskerServiceId, @RequestBody(required = false) PaginationModel paginationModel) {
        log.info("POST [{}] - getReviewsByTaskerServiceId({})", ApiEndpoint.SERVICE_REVIEW + "/" + taskerServiceId, paginationModel);
        return ResponseEntity.ok(SuccessResponseModel.<Page<ServiceReviewModel>>builder()
                .data(serviceReviewService.getReviewsByTaskerServiceId(taskerServiceId, paginationModel))
                .build());
    }

    @PostMapping
    public ResponseEntity<SuccessResponseModel<Long>> createServiceReview(
            @RequestBody AddServiceReviewRequestModel addServiceReviewRequestModel) {
        log.info("POST [{}] - createServiceReview({})", ApiEndpoint.SERVICE_REVIEW, addServiceReviewRequestModel);
        return ResponseEntity.ok(SuccessResponseModel.<Long>builder()
                .data(serviceReviewService.createServiceReview(addServiceReviewRequestModel))
                .build());
    }

}
