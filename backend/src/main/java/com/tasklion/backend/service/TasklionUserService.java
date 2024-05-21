package com.tasklion.backend.service;

import com.tasklion.backend.model.FieldValueModel;
import com.tasklion.backend.model.TasklionUserModel;

public interface TasklionUserService {

    boolean isExists(FieldValueModel requestModel);

    TasklionUserModel getTasklionUser(String username);

}
