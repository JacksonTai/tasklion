package com.tasklion.backend.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ApiMessage {

    INVALID_EMAIL_PASSWORD("Sorry, that email or password didn't work.", "invalid_email_password"),
    LOGIN_SUCCESS("Login success", "login_success"),
    REGISTER_SUCCESS("Register success", "register_success"),
    ACCESS_TOKEN_EXPIRED("Access token expired", "access_token_expired"),
    RECORD_FOUND("Record found", "record_found"),
    ;

    private final String message;
    private final String key;

}