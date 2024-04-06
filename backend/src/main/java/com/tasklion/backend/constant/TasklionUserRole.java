package com.tasklion.backend.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TasklionUserRole {

    ADMIN("Admin"),
    TASKER("Tasker"),
    CUSTOMER("Customer"),
    ;

    private final String displayName;
}