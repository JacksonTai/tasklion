package com.tasklion.backend.features.taskerAvailability.availabilityChecker.service;

import com.querydsl.core.BooleanBuilder;
import com.tasklion.backend.features.task.Task;
import com.tasklion.backend.features.task.model.TaskerTaskModel;
import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.TaskerTimeAvailability;
import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.model.GetTaskerTimeAvailabilityRequestModel;
import com.tasklion.backend.features.tasklionUser.tasker.Tasker;
import com.tasklion.backend.features.tasklionUser.tasker.model.SearchTaskerRequestModel;

import java.util.List;

public interface AvailabilityCheckerService {

    boolean isTaskerAvailable(Tasker tasker, List<Task> tasks, TaskerTaskModel taskerTaskModel);

    boolean hasAvailableTimeSlot(TaskerTimeAvailability taskerTimeAvailability, TaskerTimeAvailability tempTaskerTimeAvailability,
                                 List<Task> tasks, int duration);

    boolean hasAvailableDuration(TaskerTimeAvailability taskerTimeAvailability, List<Task> tasks, int duration);

    boolean isTimeAvailabilityOverlapping(TaskerTimeAvailability existing, TaskerTimeAvailability toCheck);

    BooleanBuilder getTaskerAvailabilityBooleanBuilder(Tasker tasker, SearchTaskerRequestModel searchTaskerRequestModel);

    BooleanBuilder getRecurringAvailabilityBooleanBuilder(Tasker tasker, SearchTaskerRequestModel searchTaskerRequestModel);

    BooleanBuilder getTaskerTimeAvailabilityBooleanBuilder(
            GetTaskerTimeAvailabilityRequestModel getTaskerTimeAvailabilityRequestModel);

}
