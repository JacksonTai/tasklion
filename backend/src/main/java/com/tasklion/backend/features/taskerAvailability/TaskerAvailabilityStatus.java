package com.tasklion.backend.features.taskerAvailability;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TaskerAvailabilityStatus {

    AVAILABLE("Available"),
    UNAVAILABLE("Unavailable"),
    BOOKED("Booked")
    ;

    public final String displayName;

}
