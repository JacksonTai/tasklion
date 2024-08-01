package com.tasklion.backend.features.makerChecker;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MakerCheckerStatus {

    PENDING,
    ACCEPTED,
    REJECTED,
    CANCELLED,
    ;

}
