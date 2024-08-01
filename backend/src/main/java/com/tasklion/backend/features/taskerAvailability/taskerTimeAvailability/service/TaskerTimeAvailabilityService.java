package com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.service;

import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.TaskerTimeAvailability;
import com.tasklion.backend.features.tasklionUser.tasker.Tasker;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

public interface TaskerTimeAvailabilityService {

    TaskerTimeAvailability findOrCreateTaskerTimeAvailability(Tasker tasker, LocalTime startTime, LocalTime endTime);

    Set<String> findAvailableTimeSlots(TaskerTimeAvailability existingTaskerTimeAvailability, LocalDate date, int taskDuration, Long excludingTaskId);

 }
