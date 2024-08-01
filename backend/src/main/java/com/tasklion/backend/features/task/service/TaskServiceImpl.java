package com.tasklion.backend.features.task.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.BooleanBuilder;
import com.tasklion.backend.common.constant.TasklionUserRole;
import com.tasklion.backend.common.model.KeyValueModel;
import com.tasklion.backend.common.util.PageUtil;
import com.tasklion.backend.features.makerChecker.MakerChecker;
import com.tasklion.backend.features.makerChecker.MakerCheckerRepo;
import com.tasklion.backend.features.makerChecker.MakerCheckerStatus;
import com.tasklion.backend.features.makerChecker.QMakerChecker;
import com.tasklion.backend.features.makerChecker.model.ValueChangeModel;
import com.tasklion.backend.features.task.*;
import com.tasklion.backend.features.task.exception.TaskException;
import com.tasklion.backend.features.task.model.*;
import com.tasklion.backend.features.taskerAvailability.availabilityChecker.service.AvailabilityCheckerService;
import com.tasklion.backend.features.taskerService.TaskerService;
import com.tasklion.backend.features.taskerService.TaskerServiceRepo;
import com.tasklion.backend.features.taskerService.serviceArea.QServiceArea;
import com.tasklion.backend.features.taskerService.serviceArea.ServiceArea;
import com.tasklion.backend.features.taskerService.serviceArea.ServiceAreaRepo;
import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaModel;
import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaRequestModel;
import com.tasklion.backend.features.taskerService.serviceArea.service.ServiceAreaService;
import com.tasklion.backend.features.taskerService.serviceCategory.ServiceCategory;
import com.tasklion.backend.features.taskerService.serviceCategory.ServiceCategoryRepo;
import com.tasklion.backend.features.tasklionAccount.TasklionAccount;
import com.tasklion.backend.features.tasklionAccount.TasklionAccountRepo;
import com.tasklion.backend.features.tasklionUser.customer.Customer;
import com.tasklion.backend.features.tasklionUser.customer.CustomerRepo;
import com.tasklion.backend.features.tasklionUser.tasker.Tasker;
import com.tasklion.backend.features.tasklionUser.tasker.TaskerRepo;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.commons.lang3.SerializationUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final AvailabilityCheckerService availabilityCheckerService;
    private final ServiceAreaService serviceAreaService;

    private final TaskRepo taskRepo;
    private final TaskerServiceRepo taskerServiceRepo;
    private final TasklionAccountRepo tasklionAccountRepo;
    private final ServiceAreaRepo serviceAreaRepo;
    private final ServiceCategoryRepo serviceCategoryRepo;
    private final CustomerRepo customerRepo;
    private final MakerCheckerRepo makerCheckerRepo;
    private final TaskerRepo taskerRepo;

    private final TaskMapper taskMapper;
    private final ObjectMapper objectMapper;

    @Override
    public List<Task> getTasks(TaskRequestModel taskRequestModel) {
        return (List<Task>) taskRepo.findAll(getTaskBooleanBuilder(taskRequestModel));
    }

    @SneakyThrows
    @Override
    public Page<CustomerTaskModel> getCustomerTasks(String username, TaskRequestModel taskRequestModel) {
        taskRequestModel.setUsername(username);
        taskRequestModel.setUserRole(TasklionUserRole.CUSTOMER.name());
        Page<CustomerTaskModel> taskModels = taskRepo.findAll(getTaskBooleanBuilder(taskRequestModel),
                        PageUtil.getPageable(taskRequestModel.getPaginationModel()))
                .map(taskMapper::toCustomerTaskModel);
        taskModels.forEach(customerTaskModel -> customerTaskModel.setStatus(TaskStatus.valueOf(customerTaskModel.getStatus()).getDisplayName()));
        return taskModels;
    }

    @Override
    public Page<TaskerTaskModel> getTaskerTasks(String username, TaskRequestModel taskRequestModel) {
        taskRequestModel.setUsername(username);
        taskRequestModel.setUserRole(TasklionUserRole.TASKER.name());
        Page<TaskerTaskModel> taskModels = taskRepo.findAll(getTaskBooleanBuilder(taskRequestModel),
                        PageUtil.getPageable(taskRequestModel.getPaginationModel()))
                .map(taskMapper::toTaskerTaskModel);
        taskModels.forEach(taskerTaskModel -> taskerTaskModel.setStatus(TaskStatus.valueOf(taskerTaskModel.getStatus()).getDisplayName()));
        return taskModels;
    }

    @Override
    public CommonTaskModel getTask(String currentRole, Long taskId, boolean isUpdateView) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        Task task = taskRepo.findById(taskId).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        if (currentRole.equalsIgnoreCase(TasklionUserRole.CUSTOMER.name())) {
            CustomerTaskModel customerTaskModel = taskMapper.toCustomerTaskModel(task);
            processTaskMakerChecker(currentUsername, customerTaskModel, isUpdateView);
            updateCustomerTaskModelFlags(customerTaskModel);
            customerTaskModel.setStatus(TaskStatus.valueOf(customerTaskModel.getStatus()).getDisplayName());
            return customerTaskModel;
        }
        TaskerTaskModel taskerTaskModel = taskMapper.toTaskerTaskModel(task);
        processTaskMakerChecker(currentUsername, taskerTaskModel, isUpdateView);
        updateTaskerTaskModelFlags(taskerTaskModel, currentUsername);
        taskerTaskModel.setStatus(TaskStatus.valueOf(taskerTaskModel.getStatus()).getDisplayName());
        return taskerTaskModel;
    }

    @Override
    public Long createTask(String username, CommonTaskRequestModel commonTaskRequestModel) {

        ServiceCategory serviceCategory = serviceCategoryRepo.findByNameIgnoreCase(commonTaskRequestModel.getServiceCategory().getName())
                .orElseThrow(() -> new IllegalArgumentException("Service category not found"));

        TaskerService taskerService = taskerServiceRepo.findByTaskerTasklionAccountUsernameAndCategory(username, serviceCategory)
                .orElseThrow(() -> new IllegalArgumentException("Tasker service not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerRepo.findByTasklionAccountUsername(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        ServiceAreaModel serviceAreaModel = commonTaskRequestModel.getServiceArea();
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QServiceArea.serviceArea.tasker.eq(taskerService.getTasker()));
        booleanBuilder.and(QServiceArea.serviceArea.state.equalsIgnoreCase(serviceAreaModel.getState()));
        booleanBuilder.and(QServiceArea.serviceArea.city.equalsIgnoreCase(serviceAreaModel.getCity()));
        booleanBuilder.and(QServiceArea.serviceArea.postcode.equalsIgnoreCase(serviceAreaModel.getPostcode()));
        ServiceArea serviceArea = serviceAreaRepo.findOne(booleanBuilder)
                .orElseThrow(() -> new IllegalArgumentException("Service area not found"));

        Task savedTask = taskRepo.save(Task.builder()
                .customer(customer)
                .taskerService(taskerService)
                .date(commonTaskRequestModel.getDate())
                .startTime(commonTaskRequestModel.getStartTime())
                .endTime(commonTaskRequestModel.getEndTime())
                .serviceArea(serviceArea)
                .status(TaskStatus.PENDING.name())
                .remarks(commonTaskRequestModel.getRemarks())
                .build());

        return savedTask.getId();
    }

    @Override
    public List<KeyValueModel<Long>> countTasksByStatus() {
        List<Task> tasks = taskRepo.findAll();
        Map<String, Long> statusCountMap = tasks.stream()
                .collect(Collectors.groupingBy(Task::getStatus, Collectors.counting()));
        return Arrays.stream(TaskStatus.values())
                .map(taskStatus -> KeyValueModel.<Long>builder()
                        .field(taskStatus.getDisplayName())
                        .value(statusCountMap.getOrDefault(taskStatus.name(), 0L))
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public void cancelTasks(String username) {
        List<Task> tasks = (List<Task>) taskRepo.findAll(getTaskBooleanBuilder(TaskRequestModel.builder()
                .username(username)
                .status(List.of(TaskStatus.PENDING.name(), TaskStatus.SCHEDULED.name()))
                .userRole(TasklionUserRole.TASKER.name())
                .build()));
        tasks.forEach(task -> task.setStatus(TaskStatus.CANCELLED.name()));
        taskRepo.saveAll(tasks);
    }

    @Override
    public CommonTaskModel updateTaskStatus(Long taskId, String status) {
        Task task = taskRepo.findById(taskId).orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if (status.equals(TaskStatus.CANCELLED.name())) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            TasklionAccount tasklionAccount = tasklionAccountRepo.findByUsername(authentication.getName())
                    .orElseThrow(() -> new IllegalArgumentException("Tasklion account not found"));
            BooleanBuilder booleanBuilder = getMakerCheckerBooleanBuilder(tasklionAccount.getId(), MakerCheckerStatus.PENDING.name());
            makerCheckerRepo.findAll(booleanBuilder).forEach(makerChecker -> {
                try {
                    Task currentTask = objectMapper.readValue(makerChecker.getCurrentValue(), Task.class);
                    if (currentTask.getId().equals(taskId)) {
                        makerCheckerRepo.delete(makerChecker);
                    }
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            });
        }

        task.setStatus(status);
        Task savedTask = taskRepo.save(task);
        return CommonTaskModel.builder()
                .id(savedTask.getId())
                .status(savedTask.getStatus())
                .remarks(savedTask.getRemarks())
                .serviceCategory(savedTask.getTaskerService().getCategory().getName())
                .creationDateTime(savedTask.getCreationDateTime())
                .build();
    }

    @SneakyThrows
    @Override
    public CommonTaskModel updateTask(String currentRole, Long taskId, CommonTaskRequestModel commonTaskRequestModel) {

        Task task = taskRepo.findById(taskId).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        boolean isPendingTask = task.getStatus().equalsIgnoreCase(TaskStatus.PENDING.name());
        boolean isScheduledTask = task.getStatus().equalsIgnoreCase(TaskStatus.SCHEDULED.name());
        if (!isPendingTask && !isScheduledTask) {
            throw new TaskException("Task cannot be updated as it is not in pending or scheduled status");
        }
        validatePendingTaskMakerChecker(taskId);

        Task originalTask = SerializationUtils.clone(task);
        Task newTask = SerializationUtils.clone(task);

        newTask.setDate(commonTaskRequestModel.getDate());
        newTask.setStartTime(commonTaskRequestModel.getStartTime());
        newTask.setEndTime(commonTaskRequestModel.getEndTime());
        newTask.setRemarks(commonTaskRequestModel.getRemarks());
        ServiceArea serviceArea = serviceAreaService.getServiceArea(ServiceAreaRequestModel.builder()
                .serviceAreaModel(commonTaskRequestModel.getServiceArea())
                .username(task.getTaskerService().getTasker().getTasklionAccount().getUsername())
                .build());
        newTask.setServiceArea(serviceArea);

        String currentValue = objectMapper.writeValueAsString(originalTask);
        String newValue = objectMapper.writeValueAsString(newTask);
        newTask.setCustomer(task.getCustomer());
        newTask.setTaskerService(task.getTaskerService());

        CommonTaskModel commonTaskModel = CommonTaskModel.builder()
                .id(task.getId())
                .status(task.getStatus())
                .remarks(task.getRemarks())
                .serviceCategory(task.getTaskerService().getCategory().getName())
                .creationDateTime(task.getCreationDateTime())
                .build();

        if (originalTask.getDate().equals(newTask.getDate()) &&
                originalTask.getStartTime().equals(newTask.getStartTime()) &&
                originalTask.getEndTime().equals(newTask.getEndTime()) &&
                originalTask.getServiceArea().equals(newTask.getServiceArea())) {
            if (!Objects.equals(originalTask.getRemarks(), newTask.getRemarks())) {
                taskRepo.save(newTask);
            }
            return commonTaskModel;
        }

        if (currentRole.equalsIgnoreCase(TasklionUserRole.TASKER.name())) {
            createOrUpdateTaskMakerChecker(newTask, currentRole, currentValue, newValue);
        }
        if (currentRole.equalsIgnoreCase(TasklionUserRole.CUSTOMER.name())) {
            if (isPendingTask) {
                String customerTasklionAccountId = newTask.getCustomer().getTasklionAccount().getId();
                BooleanBuilder booleanBuilder = getMakerCheckerBooleanBuilder(customerTasklionAccountId, MakerCheckerStatus.PENDING.name());
                List<MakerChecker> makerCheckers = (List<MakerChecker>) makerCheckerRepo.findAll(booleanBuilder);
                boolean isPendingMakerCheckerExists = makerCheckers.stream()
                        .anyMatch(makerChecker -> {
                            try {
                                Task currentTask = objectMapper.readValue(makerChecker.getCurrentValue(), Task.class);
                                return currentTask.getId().equals(newTask.getId());
                            } catch (JsonProcessingException e) {
                                throw new RuntimeException(e);
                            }
                        });
                if (!isPendingMakerCheckerExists) {
                    taskRepo.save(newTask);
                    return commonTaskModel;
                }
                createOrUpdateTaskMakerChecker(newTask, currentRole, currentValue, newValue);
            }
            if (isScheduledTask) {
                createOrUpdateTaskMakerChecker(newTask, currentRole, currentValue, newValue);
            }
        }
        return commonTaskModel;
    }

    @SneakyThrows
    @Override
    public void acceptTaskChangeRequest(Long makerCheckerId) {
        MakerChecker makerChecker = makerCheckerRepo.findById(makerCheckerId)
                .orElseThrow(() -> new IllegalArgumentException("Maker checker not found"));

        Task newTask = objectMapper.readValue(makerChecker.getNewValue(), Task.class);
        Task actualTask = taskRepo.findById(newTask.getId())
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        actualTask.setDate(newTask.getDate());
        actualTask.setStartTime(newTask.getStartTime());
        actualTask.setEndTime(newTask.getEndTime());
        actualTask.setRemarks(newTask.getRemarks());
        actualTask.setServiceArea(newTask.getServiceArea());

        taskRepo.save(actualTask);
        makerChecker.setStatus(MakerCheckerStatus.ACCEPTED.name());
        makerCheckerRepo.save(makerChecker);
    }

    @Override
    public void rejectTaskChangeRequest(Long makerCheckerId) {
        MakerChecker makerChecker = makerCheckerRepo.findById(makerCheckerId)
                .orElseThrow(() -> new IllegalArgumentException("Maker checker not found"));
        makerChecker.setStatus(MakerCheckerStatus.REJECTED.name());
        makerCheckerRepo.save(makerChecker);
    }

    @Override
    public void cancelTaskChangeRequest(Long makerCheckerId) {
        MakerChecker makerChecker = makerCheckerRepo.findById(makerCheckerId)
                .orElseThrow(() -> new IllegalArgumentException("Maker checker not found"));
        makerChecker.setStatus(MakerCheckerStatus.CANCELLED.name());
        makerCheckerRepo.save(makerChecker);
    }

    private void createOrUpdateTaskMakerChecker(Task newTask, String currentRole, String currentValue, String newValue) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        TasklionAccount makerTasklionAccount = tasklionAccountRepo.findByUsername(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("Tasklion account not found"));
        String tasklionAccountId = makerTasklionAccount.getId();

        String checkerId = currentRole.equalsIgnoreCase(TasklionUserRole.CUSTOMER.name())
                ? newTask.getTaskerService().getTasker().getTasklionAccount().getId()
                : newTask.getCustomer().getTasklionAccount().getId();

        MakerChecker makerChecker = MakerChecker.builder()
                .makerId(tasklionAccountId)
                .checkerId(checkerId)
                .currentValue(currentValue)
                .newValue(newValue)
                .status(MakerCheckerStatus.PENDING.name())
                .build();

        BooleanBuilder booleanBuilder = getMakerCheckerBooleanBuilder(tasklionAccountId, MakerCheckerStatus.PENDING.name());
        makerCheckerRepo.findAll(booleanBuilder).forEach(existingMakerChecker -> {
            try {
                Task currentTask = objectMapper.readValue(existingMakerChecker.getCurrentValue(), Task.class);
                if (currentTask.getId().equals(newTask.getId())) {
                    makerChecker.setId(existingMakerChecker.getId());
                }
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        });
        makerCheckerRepo.save(makerChecker);
    }

    private void validatePendingTaskMakerChecker(long taskId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        TasklionAccount tasklionAccount = tasklionAccountRepo.findByUsername(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("Tasklion account not found"));
        String tasklionAccountId = tasklionAccount.getId();

        BooleanBuilder booleanBuilder = getMakerCheckerBooleanBuilder(tasklionAccountId, MakerCheckerStatus.PENDING.name());
        makerCheckerRepo.findAll(booleanBuilder).forEach(makerChecker -> {
            try {
                Task currentTask = objectMapper.readValue(makerChecker.getCurrentValue(), Task.class);
                boolean isChecker = makerChecker.getCheckerId().equals(tasklionAccountId);
                if (currentTask.getId().equals(taskId) && isChecker) {
                    throw new TaskException("Task cannot be updated as there is a pending request changes to be reviewed");
                }
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        });
    }

    private void processTaskMakerChecker(String username, CommonTaskModel commonTaskModel, boolean isUpdateView) {
        TasklionAccount tasklionAccount = tasklionAccountRepo.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Tasklion account not found"));
        String tasklionAccountId = tasklionAccount.getId();
        BooleanBuilder booleanBuilder = getMakerCheckerBooleanBuilder(tasklionAccountId, MakerCheckerStatus.PENDING.name());
        StreamSupport.stream(makerCheckerRepo.findAll(booleanBuilder, Sort.by(Sort.Direction.DESC, "creationDateTime")).spliterator(), false)
                .findFirst()
                .ifPresent(makerChecker -> processMakerCheckerDetails(tasklionAccountId, makerChecker, commonTaskModel, isUpdateView));
    }

    @SneakyThrows
    private void processMakerCheckerDetails(String tasklionAccountId, MakerChecker makerChecker, CommonTaskModel commonTaskModel,
                                            boolean isUpdateView) {
        Task currentTask = objectMapper.readValue(makerChecker.getCurrentValue(), Task.class);

        if (currentTask.getId().equals(commonTaskModel.getId())) {
            boolean isPendingMakerChecker = makerChecker.getStatus().equals(MakerCheckerStatus.PENDING.name());
            boolean isMaker = makerChecker.getMakerId().equals(tasklionAccountId);
            boolean isChecker = makerChecker.getCheckerId().equals(tasklionAccountId);
            commonTaskModel.setMaker(isMaker);
            commonTaskModel.setUpdatable(isMaker && !isChecker);
            commonTaskModel.setPendingDecision(isChecker && !isMaker && isPendingMakerChecker);

            Task newTask = objectMapper.readValue(makerChecker.getNewValue(), Task.class);

            String oldServiceArea = currentTask.getServiceArea().getPostcode() + ", " + currentTask.getServiceArea().getCity() + " " + currentTask.getServiceArea().getState();
            String newServiceArea = newTask.getServiceArea().getPostcode() + ", " + newTask.getServiceArea().getCity() + " " + newTask.getServiceArea().getState();

            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a");
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            String oldTime = currentTask.getStartTime().format(timeFormatter) + " - " + currentTask.getEndTime().format(timeFormatter) + ", " + currentTask.getDate().format(dateFormatter);
            String newTime = newTask.getStartTime().format(timeFormatter) + " - " + newTask.getEndTime().format(timeFormatter) + ", " + newTask.getDate().format(dateFormatter);

            List<ValueChangeModel> valueChanges = new ArrayList<>();
            addValueChange(valueChanges, "Time", oldTime, newTime);
            addValueChange(valueChanges, "Service Area", oldServiceArea, newServiceArea);
            commonTaskModel.setValueChanges(valueChanges);
            commonTaskModel.setMakerCheckerId(makerChecker.getId());

            if (isUpdateView) {
                commonTaskModel.setDate(newTask.getDate());
                commonTaskModel.setStartTime(newTask.getStartTime());
                commonTaskModel.setEndTime(newTask.getEndTime());
                commonTaskModel.setRemarks(newTask.getRemarks());
                commonTaskModel.setServiceArea(ServiceAreaModel.builder()
                        .city(newTask.getServiceArea().getCity())
                        .state(newTask.getServiceArea().getState())
                        .postcode(newTask.getServiceArea().getPostcode())
                        .build());
            }
        }
    }

    private void addValueChange(List<ValueChangeModel> valueChanges, String field, String currentValue, String newValue) {
        if (!Objects.equals(currentValue, newValue)) {
            valueChanges.add(ValueChangeModel.builder()
                    .field(field)
                    .currentValue(currentValue)
                    .newValue(newValue)
                    .build());
        }
    }

    private void updateCustomerTaskModelFlags(CustomerTaskModel customerTaskModel) {
        String status = customerTaskModel.getStatus();
        boolean isPendingTask = status.equals(TaskStatus.PENDING.name());
        boolean isScheduledTask = status.equals(TaskStatus.SCHEDULED.name());
        boolean noExistingChanges = customerTaskModel.getValueChanges() == null || customerTaskModel.getValueChanges().isEmpty();
        customerTaskModel.setUpdatable((isPendingTask || isScheduledTask) && noExistingChanges);
        customerTaskModel.setCancellable(isPendingTask || isScheduledTask);
        customerTaskModel.setPendingReview(status.equals(TaskStatus.PENDING_REVIEW.name()));
        customerTaskModel.setReviewable(status.equals(TaskStatus.COMPLETED.name()));
    }

    private void updateTaskerTaskModelFlags(TaskerTaskModel taskerTaskModel, String taskerUsername) {

        Tasker tasker = taskerRepo.findByTasklionAccountUsername(taskerUsername)
                .orElseThrow(() -> new IllegalArgumentException("Tasker not found"));

        List<Task> tasks = getTasks(TaskRequestModel.builder()
                .userRole(TasklionUserRole.TASKER.name())
                .status(List.of(TaskStatus.SCHEDULED.name()))
                .username(tasker.getTasklionAccount().getUsername())
                .date(taskerTaskModel.getDate())
                .build());
        tasks.removeIf(task -> task.getId().equals(taskerTaskModel.getId()));


        String status = taskerTaskModel.getStatus();
        LocalDateTime now = LocalDateTime.now();
        boolean isPendingTask = status.equals(TaskStatus.PENDING.name());
        boolean isScheduledTask = status.equals(TaskStatus.SCHEDULED.name());
        boolean isTaskOverdue = now.isAfter(taskerTaskModel.getDate().atTime(taskerTaskModel.getEndTime()));
        boolean isTaskerAvailable = availabilityCheckerService.isTaskerAvailable(tasker, tasks, taskerTaskModel);
        boolean hasExistingChanges = taskerTaskModel.getValueChanges() != null && !taskerTaskModel.getValueChanges().isEmpty();

        taskerTaskModel.setAcceptable(isPendingTask && !hasExistingChanges);
        taskerTaskModel.setScheduleUnmet(!isTaskerAvailable);
        taskerTaskModel.setUpdatable((isPendingTask || isScheduledTask));
        taskerTaskModel.setCancellable(isPendingTask || isScheduledTask);
        taskerTaskModel.setCompletable(isScheduledTask && isTaskOverdue);
    }

    private BooleanBuilder getMakerCheckerBooleanBuilder(String tasklionAccountId, String status) {
        QMakerChecker makerChecker = QMakerChecker.makerChecker;
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.or(makerChecker.makerId.eq(tasklionAccountId));
        booleanBuilder.or(makerChecker.checkerId.eq(tasklionAccountId));
        if (status != null) {
            booleanBuilder.and(makerChecker.status.eq(status));
        }
        return booleanBuilder;
    }

    private BooleanBuilder getTaskBooleanBuilder(TaskRequestModel taskRequestModel) {
        QTask task = QTask.task;
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        String username = taskRequestModel.getUsername();
        if (taskRequestModel.getUsername() != null) {
            String userRole = taskRequestModel.getUserRole();
            if (userRole != null) {
                if (userRole.equalsIgnoreCase(TasklionUserRole.TASKER.name())) {
                    booleanBuilder.and(task.customer.tasklionAccount.username.notEqualsIgnoreCase(username));
                    booleanBuilder.and(task.taskerService.tasker.tasklionAccount.username.equalsIgnoreCase(username));
                } else if (userRole.equalsIgnoreCase(TasklionUserRole.CUSTOMER.name())) {
                    booleanBuilder.and(task.customer.tasklionAccount.username.equalsIgnoreCase(username));
                    booleanBuilder.and(task.taskerService.tasker.tasklionAccount.username.notEqualsIgnoreCase(username));
                }
            }
        }
        if (taskRequestModel.getStatus() != null && !taskRequestModel.getStatus().isEmpty()) {
            booleanBuilder.and(task.status.in(taskRequestModel.getStatus()));
        }
        if (taskRequestModel.getDate() != null) {
            booleanBuilder.and(task.date.eq(taskRequestModel.getDate()));
        }
        return booleanBuilder;
    }

}
