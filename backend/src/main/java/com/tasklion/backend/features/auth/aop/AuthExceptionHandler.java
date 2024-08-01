package com.tasklion.backend.features.auth.aop;

import com.tasklion.backend.common.constant.ApiMessage;
import com.tasklion.backend.common.model.api.ErrorResponseModel;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@Order(1)
@RestControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler({UsernameNotFoundException.class, BadCredentialsException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponseModel<Void> handleAuthenticationException(AuthenticationException ex) {
        log.error(ex.getMessage());
        return ErrorResponseModel.<Void>builder()
                .httpStatus(HttpStatus.UNAUTHORIZED.value())
                .status(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                .message(ex.getMessage())
                .build();
    }

    @ExceptionHandler(InsufficientAuthenticationException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponseModel<Void> handleInsufficientAuthenticationException(InsufficientAuthenticationException ex) {
        log.error(ex.getMessage());
        return ErrorResponseModel.<Void>builder()
                .httpStatus(HttpStatus.FORBIDDEN.value())
                .status(HttpStatus.FORBIDDEN.getReasonPhrase())
                .message(ApiMessage.INSUFFICIENT_AUTHENTICATION.getMessage())
                .internalCode(ApiMessage.INSUFFICIENT_AUTHENTICATION.getKey())
                .build();
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponseModel<Void> handleExpiredJwtException(ExpiredJwtException ex) {
        log.error(ex.getMessage());
        return ErrorResponseModel.<Void>builder()
                .httpStatus(HttpStatus.UNAUTHORIZED.value())
                .status(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                .message(ApiMessage.TOKEN_EXPIRED.getMessage())
                .internalCode(ApiMessage.TOKEN_EXPIRED.getKey())
                .build();
    }

    @ExceptionHandler(MalformedJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponseModel<Void> handleMalformedJwtException(MalformedJwtException ex) {
        log.error(ex.getMessage());
        return ErrorResponseModel.<Void>builder()
                .httpStatus(HttpStatus.UNAUTHORIZED.value())
                .status(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                .message(ApiMessage.INVALID_TOKEN.getMessage())
                .internalCode(ApiMessage.INVALID_TOKEN.getKey())
                .build();
    }

}
