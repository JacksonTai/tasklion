package com.tasklion.backend.features.taskerService.serviceArea.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tasklion.backend.features.tasklionUser.tasker.model.TaskerModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceAreaModel {

    private Long id;
    private String city;
    private String state;
    private String postcode;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private TaskerModel tasker;

}
