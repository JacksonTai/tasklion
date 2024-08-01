package com.tasklion.backend.features.tasklionAccount.userRole;

import com.tasklion.backend.features.tasklionAccount.model.TasklionAccountModel;
import com.tasklion.backend.features.tasklionAccount.role.RoleModel;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
public class UserRoleModel {

    private TasklionAccountModel tasklionAccountModel;
    private RoleModel roleModel;

}
