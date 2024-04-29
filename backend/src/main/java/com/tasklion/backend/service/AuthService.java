package com.tasklion.backend.service;

import com.tasklion.backend.model.ApiResponseModel;
import com.tasklion.backend.model.LoginRequestModel;
import com.tasklion.backend.model.AuthResponseModel;
import com.tasklion.backend.model.RegisterRequestModel;

public interface AuthService {

    AuthResponseModel register(RegisterRequestModel registerRequestModel);
    AuthResponseModel login(LoginRequestModel loginRequestModel);

}
