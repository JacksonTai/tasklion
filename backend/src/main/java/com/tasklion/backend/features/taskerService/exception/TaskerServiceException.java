package com.tasklion.backend.features.taskerService.exception;

public class TaskerServiceException extends RuntimeException {
    public TaskerServiceException(String message) {
        super(message);
    }
}