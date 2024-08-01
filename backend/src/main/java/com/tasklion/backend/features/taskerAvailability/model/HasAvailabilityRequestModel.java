package com.tasklion.backend.features.taskerAvailability.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HasAvailabilityRequestModel {

    private int duration;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime minTime;
    private LocalTime maxTime;

}
