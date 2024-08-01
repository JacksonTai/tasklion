package com.tasklion.backend.features.taskerAvailability.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskerScheduledAvailabilityModel {

    private LocalTime startTime;
    private LocalTime endTime;

}