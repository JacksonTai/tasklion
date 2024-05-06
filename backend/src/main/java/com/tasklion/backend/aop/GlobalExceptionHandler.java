package com.tasklion.backend.aop;

import com.tasklion.backend.constant.ApiMessage;
import com.tasklion.backend.model.ApiResponseModel;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({UsernameNotFoundException.class, BadCredentialsException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponseModel<Void> handleAuthenticationException(AuthenticationException ex) {
        log.error(ex.getMessage());
        return ApiResponseModel.<Void>builder()
                .httpStatus(HttpStatus.UNAUTHORIZED.value())
                .status(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                .message(ApiMessage.INVALID_EMAIL_PASSWORD.getMessage())
                .internalCode(ApiMessage.INVALID_EMAIL_PASSWORD.getKey())
                .build();
    }

    @ExceptionHandler(InsufficientAuthenticationException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ApiResponseModel<Void> handleInsufficientAuthenticationException(InsufficientAuthenticationException ex) {
        log.error(ex.getMessage());
        return ApiResponseModel.<Void>builder()
                .httpStatus(HttpStatus.FORBIDDEN.value())
                .status(HttpStatus.FORBIDDEN.getReasonPhrase())
                .message(ApiMessage.INSUFFICIENT_AUTHENTICATION.getMessage())
                .internalCode(ApiMessage.INSUFFICIENT_AUTHENTICATION.getKey())
                .build();
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponseModel<Void> handleExpiredJwtException(ExpiredJwtException ex) {
        log.error(ex.getMessage());
        return ApiResponseModel.<Void>builder()
                .httpStatus(HttpStatus.UNAUTHORIZED.value())
                .status(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                .message(ApiMessage.TOKEN_EXPIRED.getMessage())
                .internalCode(ApiMessage.TOKEN_EXPIRED.getKey())
                .build();
    }

    @ExceptionHandler(MalformedJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponseModel<Void> handleMalformedJwtException(MalformedJwtException ex) {
        log.error(ex.getMessage());
        return ApiResponseModel.<Void>builder()
                .httpStatus(HttpStatus.UNAUTHORIZED.value())
                .status(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                .message(ApiMessage.INVALID_TOKEN.getMessage())
                .internalCode(ApiMessage.INVALID_TOKEN.getKey())
                .build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponseModel<Map<String, String>> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        log.error(ex.getMessage());
        return ApiResponseModel.<Map<String, String>>builder()
                .httpStatus(HttpStatus.BAD_REQUEST.value())
                .status(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .data(errors)
//                .message(ApiMessage.INVALID_REQUEST.getMessage())
//                .internalCode(ApiMessage.INVALID_REQUEST.getKey())
                .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponseModel<Void> handleException(Exception ex) {
        log.error(ex.getMessage());
        log.error(Arrays.toString(ex.getStackTrace()).replace(", ", System.lineSeparator()));
        return ApiResponseModel.<Void>builder()
                .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
                .message(ApiMessage.INTERNAL_SERVER_ERROR.getMessage())
                .internalCode(ApiMessage.INTERNAL_SERVER_ERROR.getKey())
                .build();
    }

}
