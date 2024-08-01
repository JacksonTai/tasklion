package com.tasklion.backend.features.tasklionUser.tasker.model;

import com.tasklion.backend.common.util.PageUtil;
import com.tasklion.backend.features.taskerService.serviceCategory.model.ServiceCategoryModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class SearchTaskerRequestModel {

    private ServiceCategoryModel serviceCategory;
    private String state;
    private String city;
    private String postcode;
    private int duration;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<String> timeOfDay;
    private LocalTime time;
    private int page = PageUtil.DEFAULT_PAGE;
    private int size = PageUtil.DEFAULT_SIZE;

}
