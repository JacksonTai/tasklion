package com.tasklion.backend.features.tasklionUser.tasker.service;

import com.querydsl.core.BooleanBuilder;
import com.tasklion.backend.common.constant.TasklionUserRole;
import com.tasklion.backend.common.exception.ResourceNotFoundException;
import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.common.util.MathUtil;
import com.tasklion.backend.common.util.PageUtil;
import com.tasklion.backend.features.auth.model.AuthResponseModel;
import com.tasklion.backend.features.personalDetail.PersonalDetail;
import com.tasklion.backend.features.personalDetail.PersonalDetailMapper;
import com.tasklion.backend.features.personalDetail.PersonalDetailModel;
import com.tasklion.backend.features.personalDetail.PersonalDetailRepo;
import com.tasklion.backend.features.task.Task;
import com.tasklion.backend.features.task.TaskStatus;
import com.tasklion.backend.features.task.model.TaskRequestModel;
import com.tasklion.backend.features.task.service.TaskService;
import com.tasklion.backend.features.taskerAvailability.TaskerAvailability;
import com.tasklion.backend.features.taskerAvailability.TaskerAvailabilityRepo;
import com.tasklion.backend.features.taskerAvailability.availabilityChecker.service.AvailabilityCheckerService;
import com.tasklion.backend.features.taskerAvailability.taskerRecurringAvailability.TaskerRecurringAvailability;
import com.tasklion.backend.features.taskerAvailability.taskerRecurringAvailability.TaskerRecurringAvailabilityRepo;
import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.TaskerTimeAvailability;
import com.tasklion.backend.features.taskerService.QTaskerService;
import com.tasklion.backend.features.taskerService.TaskerService;
import com.tasklion.backend.features.taskerService.TaskerServiceMapper;
import com.tasklion.backend.features.taskerService.TaskerServiceRepo;
import com.tasklion.backend.features.taskerService.service.TaskerServiceManager;
import com.tasklion.backend.features.taskerService.serviceArea.ServiceAreaRepo;
import com.tasklion.backend.features.taskerService.serviceReview.model.RatingDetailModel;
import com.tasklion.backend.features.tasklionAccount.TasklionAccount;
import com.tasklion.backend.features.tasklionAccount.TasklionAccountRepo;
import com.tasklion.backend.features.tasklionAccount.constant.TasklionAccountStatus;
import com.tasklion.backend.features.tasklionAccount.userRole.service.UserRoleService;
import com.tasklion.backend.features.tasklionUser.customer.CustomerModel;
import com.tasklion.backend.features.tasklionUser.customer.service.CustomerService;
import com.tasklion.backend.features.tasklionUser.tasker.QTasker;
import com.tasklion.backend.features.tasklionUser.tasker.Tasker;
import com.tasklion.backend.features.tasklionUser.tasker.TaskerMapper;
import com.tasklion.backend.features.tasklionUser.tasker.TaskerRepo;
import com.tasklion.backend.features.tasklionUser.tasker.model.*;
import com.tasklion.backend.security.jwt.service.JwtService;
import com.tasklion.backend.security.token.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class TaskerManagerImpl implements TaskerManager {

    private final JwtService jwtService;
    private final TokenService tokenService;
    private final UserRoleService userRoleService;
    private final TaskerServiceManager taskerServiceManager;
    private final AvailabilityCheckerService availabilityCheckerService;
    private final CustomerService customerService;
    private final TaskService taskService;

    private final TaskerRepo taskerRepo;
    private final TaskerServiceRepo taskerServiceRepo;
    private final TasklionAccountRepo tasklionAccountRepo;
    private final TaskerAvailabilityRepo taskerAvailabilityRepo;
    private final TaskerRecurringAvailabilityRepo taskerRecurringAvailabilityRepo;
    private final PersonalDetailRepo personalDetailRepo;
    private final ServiceAreaRepo serviceAreaRepo;

    private final TaskerMapper taskerMapper;
    private final PersonalDetailMapper personalDetailMapper;
    private final TaskerServiceMapper taskerServiceMapper;

    @Override
    public Page<TaskerModel> getTaskers(PaginationModel paginationModel) {
        return taskerRepo.findAll(PageUtil.getPageable(paginationModel))
                .map(tasker -> {
                    TaskerModel taskerModel = taskerMapper.toModel(tasker);
                    PersonalDetailModel personalDetailModel = personalDetailRepo.findByTasklionAccountUsername(tasker.getTasklionAccount().getUsername())
                            .map(personalDetailMapper::toModel)
                            .orElse(null);
                    taskerModel.setPersonalDetail(personalDetailModel);
                    taskerModel.setRatingDetail(getRatingByUsername(tasker.getTasklionAccount().getUsername()));
                    return taskerModel;
                });
    }

    @Override
    public TaskerModel getTasker(String username) {
        QTasker qTasker = QTasker.tasker;
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qTasker.tasklionAccount.username.eq(username));
        booleanBuilder.and(qTasker.tasklionAccount.status.eq(TasklionAccountStatus.ACTIVE.name()));
        Tasker tasker = taskerRepo.findOne(booleanBuilder)
                .orElseThrow(() -> new ResourceNotFoundException("Tasker not found with username: " + username));

        TaskerModel taskerModel = taskerMapper.toModel(tasker);
        PersonalDetailModel personalDetailModel = personalDetailRepo.findByTasklionAccountUsername(username)
                .map(personalDetailMapper::toModel)
                .orElseThrow(() -> new ResourceNotFoundException("Personal Detail not found"));
        taskerModel.setPersonalDetail(personalDetailModel);
        taskerModel.setRatingDetail(getRatingByUsername(username));

        return taskerModel;
    }

    @Override
    public RatingDetailModel getRatingByUsername(String username) {
        Tasker tasker = taskerRepo.findByTasklionAccountUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Tasker not found"));
        return RatingDetailModel.builder()
                .overallRating(MathUtil.round(tasker.getServices().stream()
                        .filter(taskerService -> !taskerService.getReviews().isEmpty())
                        .mapToDouble(taskerService -> taskerServiceManager.getOverallRatingById(taskerService.getId()))
                        .average()
                        .orElse(0.0), 1))
                .totalReviews(tasker.getServices().stream()
                        .mapToInt(taskerService -> taskerService.getReviews().size())
                        .sum())
                .build();
    }

    @Override
    public long getTaskerCount() {
        QTasker qTasker = QTasker.tasker;
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qTasker.tasklionAccount.status.eq(TasklionAccountStatus.ACTIVE.name()));
        return taskerRepo.count(booleanBuilder);
    }

    @Override
    public AuthResponseModel registerTasker(TaskerModel taskerModel) {
        Tasker tasker = taskerMapper.toEntity(taskerModel);
        TasklionAccount defaultTasklionAccount = registerDefaultTasklionAccount(taskerModel);

        TasklionAccount savedTasklionAccount = userRoleService.addUserRole(
                defaultTasklionAccount, TasklionUserRole.TASKER);
        tasker.setTasklionAccount(savedTasklionAccount);
        taskerServiceManager.addServicesToTasker(tasker, taskerModel.getServices());
        saveTasker(tasker);

        return generateAuthResponseModel(savedTasklionAccount);
    }

    @Override
    public AuthResponseModel setupTasker(TaskerSetupModel taskerSetupModel) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        TasklionAccount tasklionAccount = tasklionAccountRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        TaskerModel taskerModel = TaskerModel.builder().build();
        if (taskerSetupModel != null) {
            taskerModel.setAboutMe(taskerSetupModel.getAboutMe());
            taskerModel.setServiceAreas(taskerSetupModel.getServiceAreas());
            taskerModel.setServices(taskerSetupModel.getServices());
        }
        Tasker tasker = taskerMapper.toEntity(taskerModel);

        TasklionAccount savedTasklionAccount = userRoleService.addUserRole(
                tasklionAccount, TasklionUserRole.TASKER);
        tasker.setTasklionAccount(savedTasklionAccount);
        taskerServiceManager.addServicesToTasker(tasker, taskerModel.getServices());
        saveTasker(tasker);

        return generateAuthResponseModel(savedTasklionAccount);
    }

    @Override
    public TaskerDetailModel updateTaskerDetail(String username, TaskerDetailModel taskerDetailModel) {
        Tasker tasker = taskerRepo.findByTasklionAccountUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Tasker not found"));
        tasker.setAboutMe(taskerDetailModel.getAboutMe());
        Tasker savedTasker = saveTasker(tasker);
        return TaskerDetailModel.builder()
                .aboutMe(savedTasker.getAboutMe())
                .build();
    }

    @Override
    public Page<SearchTaskerResponseModel> searchTasker(SearchTaskerRequestModel searchTaskerRequestModel) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<SearchTaskerResponseModel> searchTaskerResponseModels = new ArrayList<>();
        int duration = searchTaskerRequestModel.getDuration();

        BooleanBuilder booleanBuilder = getTaskerBooleanBuilder(authentication.getName(), searchTaskerRequestModel);
        Pageable pageable = PageUtil.getPageable(PaginationModel.builder()
                .page(searchTaskerRequestModel.getPage())
                .size(searchTaskerRequestModel.getSize())
                .build());
        Page<Tasker> taskersPage = taskerRepo.findAll(booleanBuilder, pageable);
        TaskRequestModel taskRequestModel = TaskRequestModel.builder()
                .userRole(TasklionUserRole.TASKER.name())
                .status(List.of(TaskStatus.SCHEDULED.name()))
                .build();

        TaskerTimeAvailability tempTaskerTimeAvailability = null;
        if (searchTaskerRequestModel.getTime() != null) {
            tempTaskerTimeAvailability = TaskerTimeAvailability.builder()
                    .startTime(searchTaskerRequestModel.getTime())
                    .endTime(searchTaskerRequestModel.getTime().plusHours(duration))
                    .build();
        }

        outerLoop:
        for (Tasker tasker : taskersPage.getContent()) {

            BooleanBuilder taskerAvailabilityBuilder = availabilityCheckerService.getTaskerAvailabilityBooleanBuilder(tasker, searchTaskerRequestModel);
            BooleanBuilder recurringAvailabilityBuilder = availabilityCheckerService.getRecurringAvailabilityBooleanBuilder(tasker, searchTaskerRequestModel);
            Iterable<TaskerAvailability> taskerAvailabilities = taskerAvailabilityRepo.findAll(taskerAvailabilityBuilder);
            Iterable<TaskerRecurringAvailability> taskerRecurringAvailabilities = taskerRecurringAvailabilityRepo.findAll(recurringAvailabilityBuilder);
            taskRequestModel.setUsername(tasker.getTasklionAccount().getUsername());

            for (TaskerRecurringAvailability taskerRecurringAvailability : taskerRecurringAvailabilities) {
                DayOfWeek dayOfWeek = DayOfWeek.valueOf(taskerRecurringAvailability.getDayOfWeek().toUpperCase());
                LocalDate today = LocalDate.now();
                List<LocalDate> recurringDates = Stream.iterate(today, date -> date.plusDays(1))
                        .limit(14)
                        .filter(date -> date.getDayOfWeek().equals(dayOfWeek))
                        .toList();
                for (LocalDate recurringDate : recurringDates) {
                    TaskerTimeAvailability existingTaskerTimeAvailability = taskerRecurringAvailability.getTaskerTimeAvailability();
                    taskRequestModel.setDate(recurringDate);
                    List<Task> tasks = taskService.getTasks(taskRequestModel);
                    if (availabilityCheckerService.hasAvailableTimeSlot(existingTaskerTimeAvailability, tempTaskerTimeAvailability, tasks, duration)) {
                        searchTaskerResponseModels.add(generateSearchTaskerResponseModel(tasker, searchTaskerRequestModel));
                        continue outerLoop;
                    }
                }
            }

            for (TaskerAvailability taskerAvailability : taskerAvailabilities) {
                TaskerTimeAvailability existingTaskerTimeAvailability = taskerAvailability.getTaskerTimeAvailability();
                taskRequestModel.setDate(searchTaskerRequestModel.getStartDate());
                List<Task> tasks = taskService.getTasks(taskRequestModel);
                if (availabilityCheckerService.hasAvailableDuration(existingTaskerTimeAvailability, tasks, duration)) {
                    searchTaskerResponseModels.add(generateSearchTaskerResponseModel(tasker, searchTaskerRequestModel));
                    continue outerLoop;
                }
            }
        }
        return new PageImpl<>(searchTaskerResponseModels, pageable, taskersPage.getTotalElements());
    }

    private SearchTaskerResponseModel generateSearchTaskerResponseModel(Tasker tasker, SearchTaskerRequestModel searchTaskerRequestModel) {
        String username = tasker.getTasklionAccount().getUsername();
        PersonalDetail personalDetail = personalDetailRepo.findByTasklionAccountUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Personal Detail not found"));

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(QTaskerService.taskerService.tasker.tasklionAccount.username.eq(username));
        booleanBuilder.and(QTaskerService.taskerService.category.name.eq(searchTaskerRequestModel.getServiceCategory().getName()));
        TaskerService taskerService = taskerServiceRepo.findOne(booleanBuilder)
                .orElseThrow(() -> new ResourceNotFoundException("Tasker service not found"));

        return SearchTaskerResponseModel.builder()
                .aboutMe(tasker.getAboutMe())
                .fullName(personalDetail.getFullName())
                .username(username)
                .taskerService(taskerServiceMapper.toModel(taskerService))
                .build();
    }

    private Tasker saveTasker(Tasker tasker) {
        Tasker savedTasker = taskerRepo.save(tasker);
        savedTasker.getServiceAreas().forEach(serviceArea -> {
            serviceArea.setTasker(savedTasker);
            serviceAreaRepo.save(serviceArea);
        });
        return savedTasker;
    }

    private AuthResponseModel generateAuthResponseModel(TasklionAccount tasklionAccount) {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("currentRole", TasklionUserRole.TASKER.name());
        String accessToken = jwtService.generateJwt(tasklionAccount, claims);
        String refreshToken = jwtService.generateRefreshToken(tasklionAccount, claims);
        tokenService.saveToken(accessToken, tasklionAccount);
        tokenService.saveToken(refreshToken, tasklionAccount);
        return AuthResponseModel.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    private TasklionAccount registerDefaultTasklionAccount(TaskerModel taskerModel) {
        return customerService.saveCustomer(CustomerModel.builder()
                .personalDetail(taskerModel.getPersonalDetail())
                .tasklionAccount(taskerModel.getTasklionAccount())
                .build()
        ).getTasklionAccount();
    }

    private BooleanBuilder getTaskerBooleanBuilder(String username, SearchTaskerRequestModel searchTaskerRequestModel) {
        QTasker tasker = QTasker.tasker;
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(tasker.tasklionAccount.username.notEqualsIgnoreCase(username));
        builder.and(tasker.tasklionAccount.status.notEqualsIgnoreCase(TasklionAccountStatus.BANNED.name()));
        if (searchTaskerRequestModel.getCity() != null) {
            builder.and(tasker.serviceAreas.any().city.equalsIgnoreCase(searchTaskerRequestModel.getCity()));
        }
        if (searchTaskerRequestModel.getState() != null) {
            builder.and(tasker.serviceAreas.any().state.equalsIgnoreCase(searchTaskerRequestModel.getState()));
        }
        if (searchTaskerRequestModel.getPostcode() != null) {
            builder.and(tasker.serviceAreas.any().postcode.equalsIgnoreCase(searchTaskerRequestModel.getPostcode()));
        }
        if (searchTaskerRequestModel.getServiceCategory() != null) {
            builder.and(tasker.services.any().category.name.equalsIgnoreCase(searchTaskerRequestModel.getServiceCategory().getName()));
        }
        return builder;
    }

}
