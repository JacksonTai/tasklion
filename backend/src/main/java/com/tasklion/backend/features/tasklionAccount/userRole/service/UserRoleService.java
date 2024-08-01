package com.tasklion.backend.features.tasklionAccount.userRole.service;


import com.tasklion.backend.common.constant.TasklionUserRole;
import com.tasklion.backend.features.tasklionAccount.TasklionAccount;

public interface UserRoleService {

    TasklionAccount addUserRole(TasklionAccount tasklionAccount, TasklionUserRole tasklionUserRole);

}
