package com.tasklion.backend.aop;

import com.tasklion.backend.constant.ApiMessage;
import com.tasklion.backend.model.ApiResponseModel;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandlerAdvice {

    @ExceptionHandler({UsernameNotFoundException.class, BadCredentialsException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponseModel<Void> handleAuthenticationException(Exception ex) {
        Map<String, String> responseMessages = new HashMap<>();
        responseMessages.put(ApiMessage.INVALID_EMAIL_PASSWORD.getKey(), ApiMessage.INVALID_EMAIL_PASSWORD.getMessage());
        return ApiResponseModel.create(null, responseMessages, ApiMessage.INVALID_EMAIL_PASSWORD.getKey(),
                HttpStatus.UNAUTHORIZED);
    }

}
