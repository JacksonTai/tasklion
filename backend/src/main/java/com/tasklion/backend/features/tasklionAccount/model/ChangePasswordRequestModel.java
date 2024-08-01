package com.tasklion.backend.features.tasklionAccount.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequestModel {

    private String password;
    private String newPassword;

}
