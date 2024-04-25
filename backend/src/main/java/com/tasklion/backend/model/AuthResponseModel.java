package com.tasklion.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseModel {

    private String accessToken;
    private final String tokenType = "Bearer";

}

