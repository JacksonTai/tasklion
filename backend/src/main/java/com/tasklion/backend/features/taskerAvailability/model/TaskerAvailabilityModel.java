package com.tasklion.backend.features.taskerAvailability.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskerAvailabilityModel {

    private Long id;
    private UUID taskerId;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String status;

}
