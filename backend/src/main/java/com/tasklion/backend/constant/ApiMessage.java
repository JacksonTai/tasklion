package com.tasklion.backend.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ApiMessage {

    INSUFFICIENT_AUTHENTICATION("Insufficient authentication", "insufficient_authentication"),
    TOKEN_EXPIRED("Token expired", "token_expired"),
    INVALID_TOKEN("Invalid token", "invalid_token"),
    INVALID_EMAIL_PASSWORD("Sorry, that email or password didn't work.", "invalid_email_password"),
    INTERNAL_SERVER_ERROR("Internal server error", "internal_server_error"),
    REFRESH_TOKEN_SUCCESS("Refresh token success", "refresh_token_success"),
    REGISTER_SUCCESS("Register success", "register_success"),
    LOGIN_SUCCESS("Login success", "login_success"),
    RECORD_FOUND("Record found", "record_found"),
    ;

    private final String message;
    private final String key;

}