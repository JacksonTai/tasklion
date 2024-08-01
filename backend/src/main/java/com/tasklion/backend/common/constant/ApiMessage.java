package com.tasklion.backend.common.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ApiMessage {

    INSUFFICIENT_AUTHENTICATION("Insufficient authentication", "insufficient_authentication"),
    ILLEGAL_ARGUMENT("Illegal argument", "illegal_argument"),
    MISSING_REQUEST_PARAMETER("Missing request parameter", "missing_request_parameter"),
    RESOURCE_NOT_FOUND("Resource not found", "resource_not_found"),
    TOKEN_EXPIRED("Token expired", "token_expired"),
    INVALID_TOKEN("Invalid token", "invalid_token"),
    INVALID_EMAIL_PASSWORD("Sorry, that email or password didn't work.", "invalid_email_password"),
    INVALID_PASSWORD("Invalid password", "invalid_password"),
    INTERNAL_SERVER_ERROR("Internal server error", "internal_server_error"),
    BAD_REQUEST("Bad request", "bad_request"),
    VALIDATION_ERROR("Validation error", "validation_error"),
    LOGIN_SUCCESS("Login success", "login_success"),
    RECORD_FOUND("Record found", "record_found"),

    TASK_ERROR("Task error", "task_error"),
    TASKER_SERVICE_ERROR("Tasker service error", "tasker_service_error"),
    TASKER_AVAILABILITY_ERROR("Tasker availability error", "tasker_availability_error"),
    ACCOUNT_DISABLED("Due to suspicious activity, your account has been disabled. Please contact support.", "account_disabled")
    ;

    private final String message;
    private final String key;

}