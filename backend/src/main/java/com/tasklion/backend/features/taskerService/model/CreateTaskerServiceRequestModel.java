package com.tasklion.backend.features.taskerService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class CreateTaskerServiceRequestModel {

    private List<TaskerServiceModel> taskerServiceModels;
    private String username;

}
