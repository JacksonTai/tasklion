package com.tasklion.backend.common.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TasklionUserRole {

    ADMIN("Admin"),
    TASKER("Tasker"),
    CUSTOMER("Customer"),
    ;

    public final String displayName;
}