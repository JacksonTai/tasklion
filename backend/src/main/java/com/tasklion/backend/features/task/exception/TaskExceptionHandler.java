package com.tasklion.backend.features.task.exception;

import com.tasklion.backend.common.constant.ApiMessage;
import com.tasklion.backend.common.model.api.ErrorResponseModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@Order(1)
@RestControllerAdvice
public class TaskExceptionHandler {

    @ExceptionHandler(TaskException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseModel<Void> TaskException(TaskException ex) {
        log.error(ex.getMessage());
        return ErrorResponseModel.<Void>builder()
                .httpStatus(HttpStatus.BAD_REQUEST.value())
                .status(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .internalCode(ApiMessage.TASK_ERROR.getKey())
                .message(ex.getMessage())
                .build();
    }

}
