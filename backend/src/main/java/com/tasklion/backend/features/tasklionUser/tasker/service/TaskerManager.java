package com.tasklion.backend.features.tasklionUser.tasker.service;

import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.features.auth.model.AuthResponseModel;
import com.tasklion.backend.features.taskerService.serviceReview.model.RatingDetailModel;
import com.tasklion.backend.features.tasklionUser.tasker.model.*;
import org.springframework.data.domain.Page;

public interface TaskerManager {

    Page<TaskerModel> getTaskers(PaginationModel paginationModel);

    TaskerModel getTasker(String username);

    long getTaskerCount();

    RatingDetailModel getRatingByUsername(String username);

    AuthResponseModel registerTasker(TaskerModel taskerModel);

    AuthResponseModel setupTasker(TaskerSetupModel taskerSetupModel);

    TaskerDetailModel updateTaskerDetail(String username, TaskerDetailModel taskerDetailModel);

    Page<SearchTaskerResponseModel> searchTasker(SearchTaskerRequestModel searchTaskerRequestModel);

}
