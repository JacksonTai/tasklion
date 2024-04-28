package com.tasklion.backend.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ApiMessage {

    INVALID_EMAIL_PASSWORD("Sorry, that email or password didn't work.", "invalid_email_password"),
    ;

    private final String message;
    private final String key;

}