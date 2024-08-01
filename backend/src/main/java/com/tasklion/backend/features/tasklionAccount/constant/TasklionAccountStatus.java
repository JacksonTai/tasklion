package com.tasklion.backend.features.tasklionAccount.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TasklionAccountStatus {

    ACTIVE("Active"),
    BANNED("Banned"),
    ;

    public final String displayName;

}
