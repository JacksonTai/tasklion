package com.tasklion.backend.service;

import com.tasklion.backend.model.FieldValueModel;

public interface TasklionUserService {

    boolean isExists(FieldValueModel requestModel);

}
