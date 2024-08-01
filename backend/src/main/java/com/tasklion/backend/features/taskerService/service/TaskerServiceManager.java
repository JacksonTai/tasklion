package com.tasklion.backend.features.taskerService.service;

import com.tasklion.backend.common.model.KeyValueModel;
import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.features.taskerService.TaskerService;
import com.tasklion.backend.features.taskerService.model.CreateTaskerServiceRequestModel;
import com.tasklion.backend.features.taskerService.model.TaskerServiceModel;
import com.tasklion.backend.features.taskerService.serviceReview.model.RatingDetailModel;
import com.tasklion.backend.features.tasklionUser.tasker.Tasker;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TaskerServiceManager {

    Page<TaskerServiceModel> getTaskerServices(PaginationModel paginationModel);

    Page<TaskerServiceModel> getTaskerServicesByUsername(String username, PaginationModel paginationModel);

    List<KeyValueModel<Long>> getMostOfferedTaskerServices();

    TaskerServiceModel getTaskerServiceById(long id);

    Double getOverallRatingById(Long id);

    Double getOverallRating(TaskerService taskerService);

    RatingDetailModel getTaskerServiceRatingDetailById(Long id);

    List<Long> createTaskerServices(CreateTaskerServiceRequestModel createTaskerServiceRequestModel);

    List<Long>  addServicesToTasker(Tasker tasker, List<TaskerServiceModel> taskerServicesModels);

    TaskerServiceModel updateTaskerService(Long id, TaskerServiceModel taskerServiceModel);

    void deleteTaskerService(Long id);
}
