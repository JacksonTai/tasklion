package com.tasklion.backend.aop;

import com.tasklion.backend.constant.ApiMessage;
import com.tasklion.backend.exception.ResourceNotFoundException;
import com.tasklion.backend.model.api.ErrorResponseModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.*;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseModel<Map<String, List<String>>> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException ex) {
        log.error(ex.getMessage());
        Map<String, List<String>> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
            String fieldName = fieldError.getField();
            String message = fieldError.getDefaultMessage();
            List<String> fieldErrors = errors.getOrDefault(fieldName, new ArrayList<>());
            fieldErrors.add(message);
            errors.put(fieldName, fieldErrors);
        });
        return ErrorResponseModel.<Map<String, List<String>>>builder()
                .httpStatus(HttpStatus.BAD_REQUEST.value())
                .status(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message(ApiMessage.VALIDATION_ERROR.getMessage())
                .internalCode(ApiMessage.VALIDATION_ERROR.getKey())
                .error(errors)
                .build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseModel<Void> handleIllegalArgumentException(IllegalArgumentException ex) {
        log.error(ex.getMessage());
        return ErrorResponseModel.<Void>builder()
                .httpStatus(HttpStatus.BAD_REQUEST.value())
                .status(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message(ex.getMessage())
                .internalCode(ApiMessage.ILLEGAL_ARGUMENT.getKey())
                .build();
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseModel<Void> handleMissingServletRequestParameterException(
            org.springframework.web.bind.MissingServletRequestParameterException ex) {
        log.error(ex.getMessage());
        return ErrorResponseModel.<Void>builder()
                .httpStatus(HttpStatus.BAD_REQUEST.value())
                .status(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message(ex.getMessage())
                .internalCode(ApiMessage.MISSING_REQUEST_PARAMETER.getKey())
                .build();
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void handleTasklionUserNotFoundException(ResourceNotFoundException ex) {
        log.error(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseModel<Void> handleException(Exception ex) {
        log.error(ex.getMessage());
        log.error(Arrays.toString(ex.getStackTrace()).replace(", ", System.lineSeparator()));
        return ErrorResponseModel.<Void>builder()
                .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
                .message(ApiMessage.INTERNAL_SERVER_ERROR.getMessage())
                .internalCode(ApiMessage.INTERNAL_SERVER_ERROR.getKey())
                .build();
    }

}
