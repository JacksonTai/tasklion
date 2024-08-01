package com.tasklion.backend.features.tasklionAccount.service;

import com.tasklion.backend.common.constant.TasklionUserRole;
import com.tasklion.backend.common.model.KeyValueModel;
import com.tasklion.backend.features.tasklionAccount.TasklionAccount;
import com.tasklion.backend.features.tasklionAccount.model.ChangePasswordRequestModel;
import com.tasklion.backend.features.tasklionAccount.model.TasklionAccountDetailsModel;
import com.tasklion.backend.features.tasklionAccount.model.TasklionAccountModel;

public interface TasklionAccountService {

    TasklionAccount saveTasklionAccount(TasklionAccount tasklionAccount, TasklionUserRole tasklionUserRole);

    TasklionAccountModel getTasklionAccount(String username);

    TasklionAccountDetailsModel getTasklionAccountDetail(String username);

    boolean isExists(KeyValueModel<String> requestModel);

    void updateTasklionAccountStatus(String username, String status);

    TasklionAccountDetailsModel updateTasklionAccountDetail(String username, TasklionAccountDetailsModel tasklionAccountDetailsModel);

    boolean changePassword(String username, ChangePasswordRequestModel changePasswordRequestModel);
}
