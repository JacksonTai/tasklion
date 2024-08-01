package com.tasklion.backend.features.taskerService.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tasklion.backend.features.taskerService.serviceCategory.model.ServiceCategoryModel;
import com.tasklion.backend.features.taskerService.serviceReview.model.RatingDetailModel;
import com.tasklion.backend.features.taskerService.serviceReview.model.ServiceReviewModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class TaskerServiceModel {

    private String id;
    private String description;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<ServiceReviewModel> reviews;
    private ServiceCategoryModel category;
    private RatingDetailModel ratingDetail;

}
