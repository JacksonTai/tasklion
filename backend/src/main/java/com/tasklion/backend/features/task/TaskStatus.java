package com.tasklion.backend.features.task;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TaskStatus {

    PENDING("Pending"),
    SCHEDULED("Scheduled"),
    PENDING_REVIEW("Pending Review"),
    COMPLETED("Completed"),
    CANCELLED("Cancelled"),
    REVIEWED("Reviewed"),
    ;

    public final String displayName;

}
