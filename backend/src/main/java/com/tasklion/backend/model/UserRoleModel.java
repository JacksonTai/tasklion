package com.tasklion.backend.model;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
public class UserRoleModel {

    private TasklionUserModel tasklionUserModel;
    private RoleModel roleModel;

}
