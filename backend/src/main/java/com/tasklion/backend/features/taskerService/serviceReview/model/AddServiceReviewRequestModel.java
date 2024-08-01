package com.tasklion.backend.features.taskerService.serviceReview.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddServiceReviewRequestModel {

    private Long taskerServiceId;
    private Long taskId;
    private Double rating;
    private String comment;
    private String reviewerUsername;

}
