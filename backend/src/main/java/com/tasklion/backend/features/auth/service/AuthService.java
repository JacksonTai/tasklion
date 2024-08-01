package com.tasklion.backend.features.auth.service;

import com.tasklion.backend.common.model.KeyValueModel;
import com.tasklion.backend.features.auth.model.AuthResponseModel;
import com.tasklion.backend.features.auth.model.LoginRequestModel;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {

    AuthResponseModel switchRole(KeyValueModel<String> keyValueModel);

    AuthResponseModel login(LoginRequestModel loginRequestModel);

    AuthResponseModel refreshToken(HttpServletRequest request);

}
