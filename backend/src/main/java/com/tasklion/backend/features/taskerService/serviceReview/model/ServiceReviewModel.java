package com.tasklion.backend.features.taskerService.serviceReview.model;

import com.tasklion.backend.features.task.model.TaskModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceReviewModel {

    private Double rating;
    private String comment;
    private LocalDate reviewDate;
    private String reviewerUsername;
    private TaskModel task;

}
