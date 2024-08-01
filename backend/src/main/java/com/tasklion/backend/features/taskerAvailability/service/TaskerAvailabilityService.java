package com.tasklion.backend.features.taskerAvailability.service;

import com.tasklion.backend.features.taskerAvailability.model.TaskerAvailabilityDetailModel;
import com.tasklion.backend.features.taskerAvailability.model.TaskerAvailabilityGenericModel;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface TaskerAvailabilityService {

    void addTaskerAvailability(String username, TaskerAvailabilityGenericModel taskerAvailabilityGenericModel);

    TaskerAvailabilityGenericModel getTaskerAvailability(Long id, boolean isRepeat);

    Map<String, List<TaskerAvailabilityDetailModel>> getTaskerAvailabilitiesByDay(String username);

    Map<String, Set<String>> getTaskerAvailabilitiesByDate(String username, int taskDuration, Long excludingTaskId);

//    Map<String, List<TaskerScheduledAvailabilityModel>> getTaskerAvailabilitySchedules(String username, String date);

    TaskerAvailabilityGenericModel updateTaskerAvailability(Long availabilityId, TaskerAvailabilityGenericModel taskerAvailabilityGenericModel);

    void deleteTaskerAvailability(Long id, boolean isRepeat);

}
