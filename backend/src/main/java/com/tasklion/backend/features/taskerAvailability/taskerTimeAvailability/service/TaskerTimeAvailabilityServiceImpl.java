package com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.service;

import com.querydsl.core.BooleanBuilder;
import com.tasklion.backend.common.constant.TasklionUserRole;
import com.tasklion.backend.features.task.Task;
import com.tasklion.backend.features.task.TaskStatus;
import com.tasklion.backend.features.task.model.TaskRequestModel;
import com.tasklion.backend.features.task.service.TaskService;
import com.tasklion.backend.features.taskerAvailability.availabilityChecker.service.AvailabilityCheckerService;
import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.QTaskerTimeAvailability;
import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.TaskerTimeAvailability;
import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.TaskerTimeAvailabilityRepo;
import com.tasklion.backend.features.tasklionUser.tasker.Tasker;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

@Service
@RequiredArgsConstructor
public class TaskerTimeAvailabilityServiceImpl implements TaskerTimeAvailabilityService {

    private final AvailabilityCheckerService availabilityCheckerService;
    private final TaskerTimeAvailabilityRepo taskerTimeAvailabilityRepo;
    private final TaskService taskService;

    @Override
    public TaskerTimeAvailability findOrCreateTaskerTimeAvailability(Tasker tasker, LocalTime startTime, LocalTime endTime) {
        QTaskerTimeAvailability qTaskerTimeAvailability = QTaskerTimeAvailability.taskerTimeAvailability;
        BooleanBuilder builder = new BooleanBuilder()
                .and(qTaskerTimeAvailability.tasker.eq(tasker))
                .and(qTaskerTimeAvailability.startTime.eq(startTime))
                .and(qTaskerTimeAvailability.endTime.eq(endTime));
        return taskerTimeAvailabilityRepo.findOne(builder)
                .orElseGet(() -> taskerTimeAvailabilityRepo.save(TaskerTimeAvailability.builder()
                        .tasker(tasker)
                        .startTime(startTime)
                        .endTime(endTime)
                        .build()));
    }

    @Override
    public Set<String> findAvailableTimeSlots(TaskerTimeAvailability existingTaskerTimeAvailability,
                                              LocalDate date, int taskDuration, Long excludingTaskId) {
        Tasker tasker = existingTaskerTimeAvailability.getTasker();
        Set<String> availableSlots = new TreeSet<>();

        List<Task> tasks = taskService.getTasks(TaskRequestModel.builder()
                .userRole(TasklionUserRole.TASKER.name())
                .status(List.of(TaskStatus.SCHEDULED.name()))
                .username(tasker.getTasklionAccount().getUsername())
                .date(date)
                .build());
        tasks.removeIf(task -> task.getId().equals(excludingTaskId));

        if (availabilityCheckerService.hasAvailableDuration(existingTaskerTimeAvailability, tasks, taskDuration)) {
            LocalDate today = LocalDate.now();
            LocalTime now = LocalTime.now();
            LocalTime startTime = existingTaskerTimeAvailability.getStartTime();
            LocalTime endTime = existingTaskerTimeAvailability.getEndTime();

            if (date.equals(today) && Duration.between(now, startTime).toHours() <= taskDuration) {
                startTime = now.plusMinutes(30 - now.getMinute() % 30).truncatedTo(ChronoUnit.MINUTES);
            }

            while (startTime.plusHours(taskDuration).isBefore(endTime) || startTime.plusHours(taskDuration).equals(endTime)) {
                TaskerTimeAvailability newTaskTime = TaskerTimeAvailability.builder()
                        .startTime(startTime)
                        .endTime(startTime.plusHours(taskDuration))
                        .build();

                boolean noTaskTimeOverlap = tasks.stream().noneMatch(task -> {
                    TaskerTimeAvailability existingTaskTime = TaskerTimeAvailability.builder()
                            .startTime(task.getStartTime())
                            .endTime(task.getEndTime())
                            .build();
                    return availabilityCheckerService.isTimeAvailabilityOverlapping(existingTaskTime, newTaskTime);
                });

                if (noTaskTimeOverlap) {
                    availableSlots.add(startTime.toString());
                }

                startTime = startTime.plusMinutes(30);
            }
        }

        return availableSlots;
    }

}
