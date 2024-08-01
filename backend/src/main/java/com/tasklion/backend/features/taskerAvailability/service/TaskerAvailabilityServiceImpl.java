package com.tasklion.backend.features.taskerAvailability.service;

import com.querydsl.core.BooleanBuilder;
import com.tasklion.backend.common.exception.ResourceNotFoundException;
import com.tasklion.backend.features.taskerAvailability.QTaskerAvailability;
import com.tasklion.backend.features.taskerAvailability.TaskerAvailability;
import com.tasklion.backend.features.taskerAvailability.TaskerAvailabilityRepo;
import com.tasklion.backend.features.taskerAvailability.TaskerAvailabilityStatus;
import com.tasklion.backend.features.taskerAvailability.availabilityChecker.service.AvailabilityCheckerService;
import com.tasklion.backend.features.taskerAvailability.exception.TaskerAvailabilityException;
import com.tasklion.backend.features.taskerAvailability.model.TaskerAvailabilityDetailModel;
import com.tasklion.backend.features.taskerAvailability.model.TaskerAvailabilityGenericModel;
import com.tasklion.backend.features.taskerAvailability.taskerRecurringAvailability.QTaskerRecurringAvailability;
import com.tasklion.backend.features.taskerAvailability.taskerRecurringAvailability.TaskerRecurringAvailability;
import com.tasklion.backend.features.taskerAvailability.taskerRecurringAvailability.TaskerRecurringAvailabilityRepo;
import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.TaskerTimeAvailability;
import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.TaskerTimeAvailabilityRepo;
import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.service.TaskerTimeAvailabilityService;
import com.tasklion.backend.features.tasklionAccount.constant.TasklionAccountStatus;
import com.tasklion.backend.features.tasklionUser.tasker.Tasker;
import com.tasklion.backend.features.tasklionUser.tasker.TaskerRepo;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@RequiredArgsConstructor
@Service
public class TaskerAvailabilityServiceImpl implements TaskerAvailabilityService {

    private final TaskerTimeAvailabilityService taskerTimeAvailabilityService;
    private final AvailabilityCheckerService availabilityCheckerService;

    private final TaskerAvailabilityRepo taskerAvailabilityRepo;
    private final TaskerTimeAvailabilityRepo taskerTimeAvailabilityRepo;
    private final TaskerRecurringAvailabilityRepo taskerRecurringAvailabilityRepo;
    private final TaskerRepo taskerRepo;

    @Override
    public void addTaskerAvailability(String username, TaskerAvailabilityGenericModel taskerAvailabilityGenericModel) {
        Tasker tasker = taskerRepo.findByTasklionAccountUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Tasker not found"));

        LocalTime startTime = taskerAvailabilityGenericModel.getStartTime();
        LocalTime endTime = taskerAvailabilityGenericModel.getEndTime();
        TaskerTimeAvailability taskerTimeAvailability = TaskerTimeAvailability.builder()
                .tasker(tasker)
                .startTime(startTime)
                .endTime(endTime)
                .build();
        switch (taskerAvailabilityGenericModel.getAvailabilityType()) {
            case "date":
                validateDateAvailability(taskerAvailabilityRepo.findAll(
                        getTaskerAvailabilityBooleanBuilder(tasker, taskerAvailabilityGenericModel.getDate())), taskerTimeAvailability);
                TaskerTimeAvailability savedTaskerTimeAvailability = taskerTimeAvailabilityService.findOrCreateTaskerTimeAvailability(tasker, startTime, endTime);
                taskerAvailabilityRepo.save(TaskerAvailability.builder()
                        .date(taskerAvailabilityGenericModel.getDate())
                        .taskerTimeAvailability(savedTaskerTimeAvailability)
                        .status(TaskerAvailabilityStatus.AVAILABLE.name())
                        .build());
                break;
            case "repeat":
                taskerAvailabilityGenericModel.getDays().forEach(day -> {
                    validateDayAvailability(taskerRecurringAvailabilityRepo.findAll(
                            getRecurringAvailabilityBuilder(tasker, day)), taskerTimeAvailability);
                });
                TaskerTimeAvailability savedTimeAvailability = taskerTimeAvailabilityService.findOrCreateTaskerTimeAvailability(tasker, startTime, endTime);
                taskerAvailabilityGenericModel.getDays().forEach(day -> {
                    taskerRecurringAvailabilityRepo.save(TaskerRecurringAvailability.builder()
                            .dayOfWeek(day)
                            .taskerTimeAvailability(savedTimeAvailability)
                            .build());
                });
                break;
            default:
                throw new IllegalArgumentException("Invalid availability type of: " + taskerAvailabilityGenericModel.getAvailabilityType());
        }
    }

    @Override
    public TaskerAvailabilityGenericModel getTaskerAvailability(Long id, boolean isRepeat) {
        if (isRepeat) {
            TaskerRecurringAvailability taskerRecurringAvailability = taskerRecurringAvailabilityRepo.findById(id)
                    .orElseThrow(() -> new TaskerAvailabilityException("Tasker recurring availability not found."));
            TaskerTimeAvailability taskerTimeAvailability = taskerRecurringAvailability.getTaskerTimeAvailability();
            return TaskerAvailabilityGenericModel.builder()
                    .id(taskerRecurringAvailability.getId())
                    .startTime(taskerTimeAvailability.getStartTime())
                    .endTime(taskerTimeAvailability.getEndTime())
                    .availabilityType("repeat")
                    .days(Collections.singletonList(taskerRecurringAvailability.getDayOfWeek()))
                    .build();
        } else {
            TaskerAvailability taskerAvailability = taskerAvailabilityRepo.findById(id)
                    .orElseThrow(() -> new TaskerAvailabilityException("Tasker availability not found."));
            TaskerTimeAvailability taskerTimeAvailability = taskerAvailability.getTaskerTimeAvailability();
            return TaskerAvailabilityGenericModel.builder()
                    .id(taskerAvailability.getId())
                    .date(taskerAvailability.getDate())
                    .startTime(taskerTimeAvailability.getStartTime())
                    .endTime(taskerTimeAvailability.getEndTime())
                    .availabilityType("date")
                    .build();
        }
    }

    @Override
    public Map<String, List<TaskerAvailabilityDetailModel>> getTaskerAvailabilitiesByDay(String username) {
        Tasker tasker = taskerRepo.findByTasklionAccountUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Tasker not found"));
        Map<String, List<TaskerAvailabilityDetailModel>> availabilityMap = new HashMap<>();

        LocalDate today = LocalDate.now();
        taskerAvailabilityRepo.findAll(getTaskerAvailabilityBooleanBuilder(tasker, today))
                .forEach(taskerAvailability -> {
                    TaskerTimeAvailability taskerTimeAvailability = taskerAvailability.getTaskerTimeAvailability();
                    LocalDate date = taskerAvailability.getDate();
                    TaskerAvailabilityDetailModel taskerAvailabilityDetailModel = TaskerAvailabilityDetailModel.builder()
                            .id(taskerAvailability.getId())
                            .date(date)
                            .startTime(taskerTimeAvailability.getStartTime())
                            .endTime(taskerTimeAvailability.getEndTime())
                            .isRepeat(false)
                            .build();
                    String dayOfWeek = StringUtils.capitalize(date.getDayOfWeek().name().toLowerCase());
                    availabilityMap.computeIfAbsent(dayOfWeek, k -> new ArrayList<>()).add(taskerAvailabilityDetailModel);
                });

        taskerRecurringAvailabilityRepo.findAll(getRecurringAvailabilityBuilder(tasker))
                .forEach(taskerRecurringAvailability -> {
                    TaskerTimeAvailability taskerTimeAvailability = taskerRecurringAvailability.getTaskerTimeAvailability();
                    TaskerAvailabilityDetailModel taskerAvailabilityDetailModel = TaskerAvailabilityDetailModel.builder()
                            .id(taskerRecurringAvailability.getId())
                            .startTime(taskerTimeAvailability.getStartTime())
                            .endTime(taskerTimeAvailability.getEndTime())
                            .isRepeat(true)
                            .build();
                    String dayOfWeek = taskerRecurringAvailability.getDayOfWeek();
                    availabilityMap.computeIfAbsent(dayOfWeek, k -> new ArrayList<>()).add(taskerAvailabilityDetailModel);
                });

        availabilityMap.forEach((day, availabilities) ->
                availabilities.sort(Comparator.comparing(TaskerAvailabilityDetailModel::isRepeat)
                        .thenComparing(TaskerAvailabilityDetailModel::getStartTime)));

        return availabilityMap.entrySet().stream()
                .sorted(Map.Entry.comparingByKey(Comparator.comparing(day -> DayOfWeek.valueOf(day.toUpperCase()))))
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }

    @Override
    public Map<String, Set<String>> getTaskerAvailabilitiesByDate(String username, int taskDuration, Long excludingTaskId) {
        Tasker tasker = taskerRepo.findByTasklionAccountUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Tasker not found"));

        if (tasker.getTasklionAccount().getStatus().equals(TasklionAccountStatus.BANNED.name())) {
            throw new TaskerAvailabilityException("Tasker is banned.");
        }

        Map<String, Set<String>> availabilityMap = new TreeMap<>();

        taskerAvailabilityRepo.findAll(getTaskerAvailabilityBooleanBuilder(tasker, LocalDate.now()))
                .forEach(taskerAvailability -> {
                    Set<String> availableSlots = taskerTimeAvailabilityService.findAvailableTimeSlots(
                            taskerAvailability.getTaskerTimeAvailability(), taskerAvailability.getDate(), taskDuration, excludingTaskId);
                    if (!availableSlots.isEmpty()) {
                        availabilityMap.computeIfAbsent(taskerAvailability.getDate().toString(), d -> new TreeSet<>())
                                .addAll(availableSlots);
                    }
                });

        taskerRecurringAvailabilityRepo.findAll(getRecurringAvailabilityBuilder(tasker))
                .forEach(taskerRecurringAvailability -> {
                    DayOfWeek dayOfWeek = DayOfWeek.valueOf(taskerRecurringAvailability.getDayOfWeek().toUpperCase());
                    LocalDate today = LocalDate.now();
                    List<LocalDate> recurringDates = Stream.iterate(today, date -> date.plusDays(1))
                            .limit(14)
                            .filter(recurringDate -> recurringDate.getDayOfWeek().equals(dayOfWeek))
                            .toList();
                    recurringDates.forEach(recurringDate -> {
                        Set<String> availableSlots = taskerTimeAvailabilityService.findAvailableTimeSlots(
                                taskerRecurringAvailability.getTaskerTimeAvailability(), recurringDate, taskDuration, excludingTaskId);
                        if (!availableSlots.isEmpty()) {
                            availabilityMap.computeIfAbsent(recurringDate.toString(), d -> new TreeSet<>())
                                    .addAll(availableSlots);
                        }
                    });
                });

        return availabilityMap;
    }

//    @Override
//    public Map<String, List<TaskerScheduledAvailabilityModel>> getTaskerAvailabilitySchedules(String username, String date) {
//        Tasker tasker = taskerRepo.findByTasklionAccountUsername(username)
//                .orElseThrow(() -> new ResourceNotFoundException("Tasker not found"));
//
//        Map<String, List<TaskerScheduledAvailabilityModel>> taskerAvailabilityScheduleMap = new HashMap<>();
//        taskerRecurringAvailabilityRepo.findAll(getRecurringAvailabilityBuilder(tasker)).forEach(taskerRecurringAvailability -> {
//            TaskerTimeAvailability taskerTimeAvailability = taskerRecurringAvailability.getTaskerTimeAvailability();
//            TaskerScheduledAvailabilityModel taskerScheduledAvailabilityModel = TaskerScheduledAvailabilityModel.builder()
//                    .startTime(taskerTimeAvailability.getStartTime())
//                    .endTime(taskerTimeAvailability.getEndTime())
//                    .build();
//            taskerAvailabilityScheduleMap.computeIfAbsent(taskerRecurringAvailability.getDayOfWeek(),
//                    day -> new ArrayList<>()).add(taskerScheduledAvailabilityModel);
//        });
//
//        LocalDate requestedDate = LocalDate.parse(date);
//        LocalDate startOfWeek = requestedDate.minusDays(requestedDate.getDayOfWeek().getValue() - 1);
//        LocalDate endOfWeek = startOfWeek.plusDays(6);
//
//        taskerAvailabilityRepo.findAll(getTaskerAvailabilityBooleanBuilder(tasker, startOfWeek, endOfWeek))
//                .forEach(taskerAvailability -> {
//                    TaskerTimeAvailability taskerTimeAvailability = taskerAvailability.getTaskerTimeAvailability();
//                    TaskerScheduledAvailabilityModel taskerScheduledAvailabilityModel = TaskerScheduledAvailabilityModel.builder()
//                            .startTime(taskerTimeAvailability.getStartTime())
//                            .endTime(taskerTimeAvailability.getEndTime())
//                            .build();
//                    taskerAvailabilityScheduleMap.computeIfAbsent(
//                            StringUtils.capitalize(taskerAvailability.getDate().getDayOfWeek().name().toLowerCase()),
//                            day -> new ArrayList<>()).add(taskerScheduledAvailabilityModel);
//                });
//
//        return taskerAvailabilityScheduleMap;
//    }

    @SneakyThrows
    @Override
    public TaskerAvailabilityGenericModel updateTaskerAvailability(Long availabilityId,
                                                                   TaskerAvailabilityGenericModel taskerAvailabilityGenericModel) {
        return switch (taskerAvailabilityGenericModel.getAvailabilityType()) {
            case "date" -> updateTaskerDateAvailability(availabilityId, taskerAvailabilityGenericModel);
            case "repeat" -> updateTaskerRecurringAvailability(availabilityId, taskerAvailabilityGenericModel);
            default ->
                    throw new IllegalArgumentException("Invalid availability type of: " + taskerAvailabilityGenericModel.getAvailabilityType());
        };
    }

    @Override
    public void deleteTaskerAvailability(Long id, boolean isRepeat) {
        if (isRepeat) {
            TaskerRecurringAvailability taskerRecurringAvailability = taskerRecurringAvailabilityRepo.findById(id)
                    .orElseThrow(() -> new TaskerAvailabilityException("Tasker recurring availability not found."));
            taskerRecurringAvailabilityRepo.deleteById(taskerRecurringAvailability.getId());
        } else {
            TaskerAvailability taskerAvailability = taskerAvailabilityRepo.findById(id)
                    .orElseThrow(() -> new TaskerAvailabilityException("Tasker availability not found."));
            taskerAvailabilityRepo.deleteById(taskerAvailability.getId());
        }
    }

    private TaskerAvailabilityGenericModel updateTaskerDateAvailability(Long availabilityId,
                                                                        TaskerAvailabilityGenericModel taskerAvailabilityGenericModel) {
        TaskerAvailability taskerAvailability = taskerAvailabilityRepo.findById(availabilityId)
                .orElseThrow(() -> new TaskerAvailabilityException("Tasker availability not found."));
        taskerAvailability.setDate(taskerAvailabilityGenericModel.getDate());
        LocalTime startTime = taskerAvailabilityGenericModel.getStartTime();
        LocalTime endTime = taskerAvailabilityGenericModel.getEndTime();

        TaskerTimeAvailability existingTaskerTimeAvailability = taskerAvailability.getTaskerTimeAvailability();
        if (!existingTaskerTimeAvailability.getStartTime().equals(startTime) || !existingTaskerTimeAvailability.getEndTime().equals(endTime)) {
            TaskerTimeAvailability taskerTimeAvailability = TaskerTimeAvailability.builder()
                    .tasker(existingTaskerTimeAvailability.getTasker())
                    .startTime(existingTaskerTimeAvailability.getStartTime())
                    .endTime(existingTaskerTimeAvailability.getEndTime())
                    .build();

            Tasker tasker = taskerTimeAvailability.getTasker();
            taskerAvailability.setDate(taskerAvailabilityGenericModel.getDate());
            taskerTimeAvailability.setStartTime(startTime);
            taskerTimeAvailability.setEndTime(endTime);

            BooleanBuilder conflictingDateAvailabilities = getTaskerAvailabilityBooleanBuilder(
                    tasker, taskerAvailabilityGenericModel.getDate(), availabilityId);
            validateDateAvailability(taskerAvailabilityRepo.findAll(conflictingDateAvailabilities), taskerTimeAvailability);

            TaskerTimeAvailability savedTaskerTimeAvailability = taskerTimeAvailabilityService.findOrCreateTaskerTimeAvailability(tasker, startTime, endTime);
            taskerAvailability.setTaskerTimeAvailability(taskerTimeAvailabilityRepo.save(savedTaskerTimeAvailability));
        }
        taskerAvailabilityRepo.save(taskerAvailability);
        return taskerAvailabilityGenericModel;
    }

    private TaskerAvailabilityGenericModel updateTaskerRecurringAvailability(Long availabilityId,
                                                                             TaskerAvailabilityGenericModel taskerAvailabilityGenericModel) {
        TaskerRecurringAvailability taskerRecurringAvailability = taskerRecurringAvailabilityRepo.findById(availabilityId)
                .orElseThrow(() -> new TaskerAvailabilityException("Tasker recurring availability not found."));
        LocalTime startTime = taskerAvailabilityGenericModel.getStartTime();
        LocalTime endTime = taskerAvailabilityGenericModel.getEndTime();

        TaskerTimeAvailability existingTaskerTimeAvailability = taskerRecurringAvailability.getTaskerTimeAvailability();

        if (!existingTaskerTimeAvailability.getStartTime().equals(startTime) || !existingTaskerTimeAvailability.getEndTime().equals(endTime)) {
            TaskerTimeAvailability taskerTimeAvailability = TaskerTimeAvailability.builder()
                    .tasker(existingTaskerTimeAvailability.getTasker())
                    .startTime(existingTaskerTimeAvailability.getStartTime())
                    .endTime(existingTaskerTimeAvailability.getEndTime())
                    .build();

            Tasker tasker = taskerTimeAvailability.getTasker();
            taskerRecurringAvailability.setDayOfWeek(taskerAvailabilityGenericModel.getDays().get(0));
            taskerTimeAvailability.setStartTime(startTime);
            taskerTimeAvailability.setEndTime(endTime);

            BooleanBuilder conflictingRecurringAvailabilities = getRecurringAvailabilityBuilder(
                    tasker, taskerRecurringAvailability.getDayOfWeek(), availabilityId);
            validateDayAvailability(taskerRecurringAvailabilityRepo.findAll(conflictingRecurringAvailabilities), taskerTimeAvailability);

            TaskerTimeAvailability savedTaskerTimeAvailability = taskerTimeAvailabilityService.findOrCreateTaskerTimeAvailability(tasker, startTime, endTime);
            taskerRecurringAvailability.setTaskerTimeAvailability(taskerTimeAvailabilityRepo.save(savedTaskerTimeAvailability));
        }
        taskerRecurringAvailabilityRepo.save(taskerRecurringAvailability);
        return taskerAvailabilityGenericModel;
    }

    private void validateDateAvailability(Iterable<TaskerAvailability> taskerAvailabilities, TaskerTimeAvailability newTimeAvailability) {
        for (TaskerAvailability existingAvailability : taskerAvailabilities) {
            TaskerTimeAvailability existingTimeAvailability = existingAvailability.getTaskerTimeAvailability();
            if (availabilityCheckerService.isTimeAvailabilityOverlapping(existingTimeAvailability, newTimeAvailability)) {
                throw new TaskerAvailabilityException("The time overlapped with existing availability on the same date.");
            }
        }
    }

    private void validateDayAvailability(Iterable<TaskerRecurringAvailability> existingAvailabilities, TaskerTimeAvailability newAvailability) {
        for (TaskerRecurringAvailability existingAvailability : existingAvailabilities) {
            TaskerTimeAvailability existingTimeAvailability = existingAvailability.getTaskerTimeAvailability();
            if (availabilityCheckerService.isTimeAvailabilityOverlapping(existingTimeAvailability, newAvailability)) {
                throw new TaskerAvailabilityException("The time overlapped with existing availability on the same day of week.");
            }
        }
    }

    private BooleanBuilder getTaskerAvailabilityBooleanBuilder(Tasker tasker) {
        QTaskerAvailability qTaskerAvailability = QTaskerAvailability.taskerAvailability;
        return new BooleanBuilder()
                .and(qTaskerAvailability.taskerTimeAvailability.tasker.eq(tasker))
                .and(qTaskerAvailability.status.eq(TaskerAvailabilityStatus.AVAILABLE.name()));
    }

    private BooleanBuilder getTaskerAvailabilityBooleanBuilder(Tasker tasker, LocalDate today) {
        QTaskerAvailability qTaskerAvailability = QTaskerAvailability.taskerAvailability;
        return new BooleanBuilder()
                .and(qTaskerAvailability.taskerTimeAvailability.tasker.eq(tasker))
                .and(qTaskerAvailability.status.eq(TaskerAvailabilityStatus.AVAILABLE.name()))
                .and(qTaskerAvailability.date.goe(today));
    }

//    private BooleanBuilder getTaskerAvailabilityBooleanBuilder(Tasker tasker, LocalDate startOfWeek, LocalDate endOfWeek) {
//        QTaskerAvailability qTaskerAvailability = QTaskerAvailability.taskerAvailability;
//        return new BooleanBuilder()
//                .and(qTaskerAvailability.taskerTimeAvailability.tasker.eq(tasker))
//                .and(qTaskerAvailability.date.between(startOfWeek, endOfWeek))
//                .and(qTaskerAvailability.status.eq(TaskerAvailabilityStatus.AVAILABLE.name()));
//    }

    private BooleanBuilder getTaskerAvailabilityBooleanBuilder(Tasker tasker, LocalDate date, Long availabilityId) {
        QTaskerAvailability qTaskerAvailability = QTaskerAvailability.taskerAvailability;
        return new BooleanBuilder()
                .and(qTaskerAvailability.taskerTimeAvailability.tasker.eq(tasker))
                .and(qTaskerAvailability.date.eq(date))
                .and(qTaskerAvailability.status.eq(TaskerAvailabilityStatus.AVAILABLE.name()))
                .and(qTaskerAvailability.id.ne(availabilityId));
    }

    private BooleanBuilder getRecurringAvailabilityBuilder(Tasker tasker) {
        QTaskerRecurringAvailability qTaskerRecurringAvailability = QTaskerRecurringAvailability.taskerRecurringAvailability;
        return new BooleanBuilder()
                .and(qTaskerRecurringAvailability.taskerTimeAvailability.tasker.eq(tasker));
    }

    private BooleanBuilder getRecurringAvailabilityBuilder(Tasker tasker, String dayOfWeek) {
        QTaskerRecurringAvailability qTaskerRecurringAvailability = QTaskerRecurringAvailability.taskerRecurringAvailability;
        return new BooleanBuilder()
                .and(qTaskerRecurringAvailability.taskerTimeAvailability.tasker.eq(tasker))
                .and(qTaskerRecurringAvailability.dayOfWeek.eq(dayOfWeek));
    }

    private BooleanBuilder getRecurringAvailabilityBuilder(Tasker tasker, String dayOfWeek, Long availabilityId) {
        QTaskerRecurringAvailability qTaskerRecurringAvailability = QTaskerRecurringAvailability.taskerRecurringAvailability;
        return new BooleanBuilder()
                .and(qTaskerRecurringAvailability.taskerTimeAvailability.tasker.eq(tasker))
                .and(qTaskerRecurringAvailability.dayOfWeek.eq(dayOfWeek))
                .and(qTaskerRecurringAvailability.id.ne(availabilityId));
    }


}
