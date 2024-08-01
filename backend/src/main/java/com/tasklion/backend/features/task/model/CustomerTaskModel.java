package com.tasklion.backend.features.task.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
public class CustomerTaskModel extends CommonTaskModel {

    private String taskerUsername;
    private boolean isReviewable;
    private boolean isPendingReview;

}
