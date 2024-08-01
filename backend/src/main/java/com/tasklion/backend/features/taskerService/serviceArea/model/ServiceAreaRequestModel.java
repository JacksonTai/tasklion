package com.tasklion.backend.features.taskerService.serviceArea.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ServiceAreaRequestModel {

    private ServiceAreaModel serviceAreaModel;
    private String username;

}
