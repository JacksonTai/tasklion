package com.tasklion.backend.features.task.model;


import com.tasklion.backend.features.makerChecker.model.ValueChangeModel;
import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaModel;
import com.tasklion.backend.features.taskerService.serviceReview.model.ServiceReviewModel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@SuperBuilder
@NoArgsConstructor
@Data
public class CommonTaskModel {

    private long id;
    private long taskerServiceId;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private ServiceAreaModel serviceArea;
    private String status;
    private String remarks;
    private String serviceCategory;
    private long makerCheckerId;
    private List<ValueChangeModel> valueChanges;
    private ServiceReviewModel serviceReview;

    private boolean isMaker;
    private boolean isCancellable;
    private boolean isUpdatable;
    private boolean isPendingDecision = false;
    private LocalDateTime creationDateTime;

}
