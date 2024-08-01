package com.tasklion.backend.features.tasklionUser.tasker.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tasklion.backend.features.taskerService.model.TaskerServiceModel;
import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class TaskerSetupModel {

    private String aboutMe;
    private List<ServiceAreaModel> serviceAreas;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<TaskerServiceModel> services;

}
