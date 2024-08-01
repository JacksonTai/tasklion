package com.tasklion.backend.features.task.model;

import com.tasklion.backend.features.taskerService.model.TaskerServiceModel;
import com.tasklion.backend.features.tasklionUser.customer.CustomerModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;


@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
public class TaskModel extends CommonTaskModel {

    private CustomerModel customer;
    private TaskerServiceModel taskerService;


}
