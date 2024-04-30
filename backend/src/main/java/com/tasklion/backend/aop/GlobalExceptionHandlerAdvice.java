package com.tasklion.backend.aop;

import com.tasklion.backend.constant.ApiMessage;
import com.tasklion.backend.model.ApiResponseModel;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandlerAdvice {

    @ExceptionHandler({UsernameNotFoundException.class, BadCredentialsException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponseModel<Void> handleAuthenticationException(Exception ex) {
        return ApiResponseModel.<Void>builder()
                .httpStatus(HttpStatus.UNAUTHORIZED.value())
                .status(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                .message(ApiMessage.INVALID_EMAIL_PASSWORD.getMessage())
                .internalCode(ApiMessage.INVALID_EMAIL_PASSWORD.getKey())
                .build();
    }

}
