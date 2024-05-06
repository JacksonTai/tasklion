package com.tasklion.backend.service;

import com.tasklion.backend.model.AuthResponseModel;
import com.tasklion.backend.model.CustomerModel;
import com.tasklion.backend.model.LoginRequestModel;
import com.tasklion.backend.model.TaskerModel;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {

    AuthResponseModel registerCustomer(CustomerModel customerModel);

    AuthResponseModel registerTasker(TaskerModel taskerModel);

    AuthResponseModel login(LoginRequestModel loginRequestModel);

    AuthResponseModel refreshToken(HttpServletRequest request);

}
