package com.tasklion.backend.features.taskerAvailability.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskerAvailabilityGenericModel {

    private Long id;
    private String availabilityType;
    private LocalDate date;
    private List<String> days;
    private LocalTime startTime;
    private LocalTime endTime;

}
