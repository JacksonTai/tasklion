package com.tasklion.backend.features.auth.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthResponseModel {

    private String accessToken;
    private String refreshToken;

}

