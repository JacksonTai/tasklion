package com.tasklion.backend.aop;

import com.tasklion.backend.constant.ApiMessage;
import com.tasklion.backend.model.ApiResponseModel;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.logging.Logger;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private final Logger logger = Logger.getLogger(GlobalExceptionHandler.class.getName());

    @ExceptionHandler({UsernameNotFoundException.class, BadCredentialsException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponseModel<Void> handleAuthenticationException(AuthenticationException ex) {
        logger.severe(ex.getMessage());
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
        logger.severe(ex.getMessage());
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
        logger.severe(ex.getMessage());
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
        logger.severe(ex.getMessage());
        return ApiResponseModel.<Void>builder()
                .httpStatus(HttpStatus.UNAUTHORIZED.value())
                .status(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                .message(ApiMessage.INVALID_TOKEN.getMessage())
                .internalCode(ApiMessage.INVALID_TOKEN.getKey())
                .build();
    }

}
