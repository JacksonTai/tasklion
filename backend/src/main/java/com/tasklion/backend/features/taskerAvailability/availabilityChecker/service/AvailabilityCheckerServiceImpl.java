package com.tasklion.backend.features.taskerAvailability.availabilityChecker.service;

import com.querydsl.core.BooleanBuilder;
import com.tasklion.backend.common.constant.TimeRangeConstant;
import com.tasklion.backend.features.task.Task;
import com.tasklion.backend.features.task.model.TaskerTaskModel;
import com.tasklion.backend.features.taskerAvailability.QTaskerAvailability;
import com.tasklion.backend.features.taskerAvailability.TaskerAvailability;
import com.tasklion.backend.features.taskerAvailability.TaskerAvailabilityRepo;
import com.tasklion.backend.features.taskerAvailability.taskerRecurringAvailability.QTaskerRecurringAvailability;
import com.tasklion.backend.features.taskerAvailability.taskerRecurringAvailability.TaskerRecurringAvailability;
import com.tasklion.backend.features.taskerAvailability.taskerRecurringAvailability.TaskerRecurringAvailabilityRepo;
import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.QTaskerTimeAvailability;
import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.TaskerTimeAvailability;
import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.model.GetTaskerTimeAvailabilityRequestModel;
import com.tasklion.backend.features.tasklionUser.tasker.Tasker;
import com.tasklion.backend.features.tasklionUser.tasker.model.SearchTaskerRequestModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@RequiredArgsConstructor
@Service
public class AvailabilityCheckerServiceImpl implements AvailabilityCheckerService {

    private final TaskerAvailabilityRepo taskerAvailabilityRepo;
    private final TaskerRecurringAvailabilityRepo taskerRecurringAvailabilityRepo;

    @Override
    public boolean isTaskerAvailable(Tasker tasker, List<Task> tasks, TaskerTaskModel taskerTaskModel) {

        LocalTime startTime = taskerTaskModel.getStartTime();
        LocalTime endTime = taskerTaskModel.getEndTime();
        TaskerTimeAvailability tempTaskerTimeAvailability = TaskerTimeAvailability.builder()
                .startTime(startTime)
                .endTime(endTime)
                .build();

        int duration = endTime.getHour() - startTime.getHour();
        SearchTaskerRequestModel searchTaskerRequestModel = SearchTaskerRequestModel.builder()
                .startDate(taskerTaskModel.getDate())
                .endDate(taskerTaskModel.getDate())
                .time(taskerTaskModel.getStartTime())
                .duration(duration)
                .build();

        BooleanBuilder taskerAvailabilitybooleanBuilder = getTaskerAvailabilityBooleanBuilder(tasker, searchTaskerRequestModel);
        for (TaskerAvailability taskerAvailability : taskerAvailabilityRepo.findAll(taskerAvailabilitybooleanBuilder)) {
            TaskerTimeAvailability taskerTimeAvailability = taskerAvailability.getTaskerTimeAvailability();
            return hasAvailableTimeSlot(taskerTimeAvailability, tempTaskerTimeAvailability, tasks, duration);
        }
        BooleanBuilder recurringAvailabilityBooleanBuilder = getRecurringAvailabilityBooleanBuilder(tasker, searchTaskerRequestModel);
        for (TaskerRecurringAvailability taskerRecurringAvailability : taskerRecurringAvailabilityRepo.findAll(recurringAvailabilityBooleanBuilder)) {
            TaskerTimeAvailability taskerTimeAvailability = taskerRecurringAvailability.getTaskerTimeAvailability();
            return hasAvailableTimeSlot(taskerTimeAvailability, tempTaskerTimeAvailability, tasks, duration);
        }
        return false;
    }

    @Override
    public boolean hasAvailableTimeSlot(TaskerTimeAvailability taskerTimeAvailability, TaskerTimeAvailability tempTaskerTimeAvailability,
                                        List<Task> tasks, int duration) {
        if (hasAvailableDuration(taskerTimeAvailability, tasks, duration)) {
            return tasks.isEmpty() || tasks.stream().anyMatch(task -> !isTimeAvailabilityOverlapping(
                    TaskerTimeAvailability.builder()
                            .startTime(task.getStartTime())
                            .endTime(task.getEndTime())
                            .build()
                    , tempTaskerTimeAvailability));
        }
        return false;
    }

    @Override
    public boolean hasAvailableDuration(TaskerTimeAvailability taskerTimeAvailability, List<Task> tasks, int duration) {

        if (tasks.isEmpty()) {
            return true;
        }

        List<LocalTime[]> tasksTime = tasks.stream()
                .map(task -> new LocalTime[]{task.getStartTime(), task.getEndTime()})
                .toList();
        List<LocalTime[]> sortedTasksTime = tasksTime.stream()
                .sorted(Comparator.comparing(a -> a[0]))
                .toList();
        LocalTime taskerStart = taskerTimeAvailability.getStartTime();
        LocalTime taskerEnd = taskerTimeAvailability.getEndTime();

        long hoursBeforeFirstTask = Duration.between(taskerStart, sortedTasksTime.get(0)[0]).toHours();
        if (hoursBeforeFirstTask >= duration) {
            return true;
        }
        for (int i = 0; i < sortedTasksTime.size() - 1; i++) {
            LocalTime endCurrent = sortedTasksTime.get(i)[1];
            LocalTime startNext = sortedTasksTime.get(i + 1)[0];
            long hoursBetweenTasks = Duration.between(endCurrent, startNext).toHours();
            if (hoursBetweenTasks >= duration) {
                return true;
            }
        }
        long hoursAfterLastTask = Duration.between(sortedTasksTime.get(sortedTasksTime.size() - 1)[1], taskerEnd).toHours();
        return hoursAfterLastTask >= duration;
    }

    @Override
    public boolean isTimeAvailabilityOverlapping(TaskerTimeAvailability existing, TaskerTimeAvailability toCheck) {
        LocalTime existingStart = existing.getStartTime();
        LocalTime existingEnd = existing.getEndTime();
        LocalTime newStart = toCheck.getStartTime();
        LocalTime newEnd = toCheck.getEndTime();
        return (newEnd.isAfter(existingStart) && newEnd.isBefore(existingEnd)) ||
                (newStart.isAfter(existingStart) && newStart.isBefore(existingEnd)) ||
                (newStart.isBefore(existingStart) && newEnd.isAfter(existingEnd)) ||
                (newStart.equals(existingStart) || newEnd.equals(existingEnd));
    }

    @Override
    public BooleanBuilder getTaskerAvailabilityBooleanBuilder(Tasker tasker, SearchTaskerRequestModel searchTaskerRequestModel) {
        QTaskerAvailability qTaskerAvailability = QTaskerAvailability.taskerAvailability;
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        LocalDate startDate = searchTaskerRequestModel.getStartDate();
        LocalDate endDate = searchTaskerRequestModel.getEndDate();
        booleanBuilder.and(qTaskerAvailability.taskerTimeAvailability.tasker.eq(tasker));
        if (startDate != null && endDate != null) {
            booleanBuilder.and(qTaskerAvailability.date.between(startDate, endDate));
        }
        GetTaskerTimeAvailabilityRequestModel getTaskerTimeAvailabilityRequestModel = GetTaskerTimeAvailabilityRequestModel.builder()
                .timeOfDay(searchTaskerRequestModel.getTimeOfDay())
                .specificTime(searchTaskerRequestModel.getTime())
                .duration(searchTaskerRequestModel.getDuration())
                .qTaskerTimeAvailability(qTaskerAvailability.taskerTimeAvailability)
                .build();
        booleanBuilder.and(getTaskerTimeAvailabilityBooleanBuilder(getTaskerTimeAvailabilityRequestModel));
        return booleanBuilder;
    }

    @Override
    public BooleanBuilder getRecurringAvailabilityBooleanBuilder(Tasker tasker, SearchTaskerRequestModel searchTaskerRequestModel) {
        QTaskerRecurringAvailability qTaskerRecurringAvailability = QTaskerRecurringAvailability.taskerRecurringAvailability;
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        LocalDate startDate = searchTaskerRequestModel.getStartDate();
        LocalDate endDate = searchTaskerRequestModel.getEndDate();
        booleanBuilder.and(qTaskerRecurringAvailability.taskerTimeAvailability.tasker.eq(tasker));
        if (startDate != null && endDate != null) {
            Set<DayOfWeek> daysOfWeek = new HashSet<>();
            LocalDate date = startDate;
            while (!date.isAfter(endDate)) {
                daysOfWeek.add(date.getDayOfWeek());
                date = date.plusDays(1);
            }
            BooleanBuilder recurringBuilder = new BooleanBuilder();
            daysOfWeek.forEach(dayOfWeek -> {
                recurringBuilder.or(qTaskerRecurringAvailability.dayOfWeek.equalsIgnoreCase(dayOfWeek.name()));
            });
            booleanBuilder.and(recurringBuilder);
        }
        GetTaskerTimeAvailabilityRequestModel getTaskerTimeAvailabilityRequestModel = GetTaskerTimeAvailabilityRequestModel.builder()
                .timeOfDay(searchTaskerRequestModel.getTimeOfDay())
                .specificTime(searchTaskerRequestModel.getTime())
                .duration(searchTaskerRequestModel.getDuration())
                .qTaskerTimeAvailability(qTaskerRecurringAvailability.taskerTimeAvailability)
                .build();
        booleanBuilder.and(getTaskerTimeAvailabilityBooleanBuilder(getTaskerTimeAvailabilityRequestModel));
        return booleanBuilder;
    }


    @Override
    public BooleanBuilder getTaskerTimeAvailabilityBooleanBuilder(
            GetTaskerTimeAvailabilityRequestModel getTaskerTimeAvailabilityRequestModel) {

        List<String> timeOfDay = getTaskerTimeAvailabilityRequestModel.getTimeOfDay();
        LocalTime specificTime = getTaskerTimeAvailabilityRequestModel.getSpecificTime();
        int duration = getTaskerTimeAvailabilityRequestModel.getDuration();
        QTaskerTimeAvailability qTaskerTimeAvailability = getTaskerTimeAvailabilityRequestModel.getQTaskerTimeAvailability();

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (timeOfDay != null && !timeOfDay.isEmpty()) {
            Map<String, LocalTime[]> timeRanges = TimeRangeConstant.getTimeRanges();
            for (String period : timeOfDay) {
                LocalTime[] range = timeRanges.get(period);
                if (range != null) {
                    LocalTime periodStart = range[0];
                    LocalTime periodEnd = range[1];
                    booleanBuilder.or(qTaskerTimeAvailability.startTime.loe(periodEnd)
                            .and(qTaskerTimeAvailability.startTime.loe(periodEnd.minusHours(duration)))
                            .and(qTaskerTimeAvailability.endTime.goe(periodStart))
                            .and(qTaskerTimeAvailability.endTime.goe(periodStart.plusHours(duration))));
                }
            }
        } else if (specificTime != null) {
            booleanBuilder.and(qTaskerTimeAvailability.startTime.loe(specificTime));
            booleanBuilder.and(qTaskerTimeAvailability.endTime.goe(specificTime.plusHours(duration)));
        }
        return booleanBuilder;
    }

}
