package com.tasklion.backend.features.task.model;

import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaModel;
import com.tasklion.backend.features.taskerService.serviceCategory.model.ServiceCategoryModel;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class CommonTaskRequestModel {

    private ServiceCategoryModel serviceCategory;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private ServiceAreaModel serviceArea;
    private String remarks;

}
