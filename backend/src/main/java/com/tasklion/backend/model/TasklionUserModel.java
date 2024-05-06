package com.tasklion.backend.model;

import com.tasklion.backend.constant.TasklionUserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class TasklionUserModel {

    private String username;
    private String email;
    private String password;
    private String confirmPassword;
    private TasklionUserRole role;

}
