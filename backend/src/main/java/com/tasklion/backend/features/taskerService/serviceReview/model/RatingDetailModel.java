package com.tasklion.backend.features.taskerService.serviceReview.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RatingDetailModel {

    private int totalReviews;
    private double overallRating;

}
