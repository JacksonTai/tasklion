package com.tasklion.backend.service;

import com.tasklion.backend.model.AuthResponseModel;
import com.tasklion.backend.model.LoginRequestModel;
import com.tasklion.backend.model.RegisterRequestModel;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {

    AuthResponseModel register(RegisterRequestModel registerRequestModel);

    AuthResponseModel login(LoginRequestModel loginRequestModel);

    AuthResponseModel refreshToken(HttpServletRequest request);

}
