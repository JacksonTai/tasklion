package com.tasklion.backend.features.task.service;


import com.tasklion.backend.common.model.KeyValueModel;
import com.tasklion.backend.features.task.Task;
import com.tasklion.backend.features.task.model.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TaskService {

    List<Task> getTasks(TaskRequestModel taskRequestModel);

    Page<CustomerTaskModel> getCustomerTasks(String username, TaskRequestModel taskRequestModel);

    Page<TaskerTaskModel> getTaskerTasks(String username, TaskRequestModel taskRequestModel);

    CommonTaskModel getTask(String currentRole, Long taskId, boolean isUpdateView);

    Long createTask(String username, CommonTaskRequestModel commonTaskRequestModel);

    List<KeyValueModel<Long>> countTasksByStatus();

    void cancelTasks(String username);

    CommonTaskModel updateTaskStatus(Long taskId, String status);

    CommonTaskModel updateTask(String currentRole, Long taskId, CommonTaskRequestModel commonTaskRequestModel);

    void acceptTaskChangeRequest(Long makerCheckerId);

    void rejectTaskChangeRequest(Long makerCheckerId);

    void cancelTaskChangeRequest(Long makerCheckerId);
}
