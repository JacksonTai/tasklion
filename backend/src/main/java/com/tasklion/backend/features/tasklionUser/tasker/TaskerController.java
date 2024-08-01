package com.tasklion.backend.features.tasklionUser.tasker;

import com.tasklion.backend.common.constant.ApiEndpoint;
import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.common.model.api.SuccessResponseModel;
import com.tasklion.backend.features.auth.model.AuthResponseModel;
import com.tasklion.backend.features.task.model.CommonTaskRequestModel;
import com.tasklion.backend.features.task.model.TaskRequestModel;
import com.tasklion.backend.features.task.model.TaskerTaskModel;
import com.tasklion.backend.features.task.service.TaskService;
import com.tasklion.backend.features.taskerAvailability.model.TaskerAvailabilityDetailModel;
import com.tasklion.backend.features.taskerAvailability.model.TaskerAvailabilityGenericModel;
import com.tasklion.backend.features.taskerAvailability.service.TaskerAvailabilityService;
import com.tasklion.backend.features.taskerService.model.TaskerServiceModel;
import com.tasklion.backend.features.taskerService.service.TaskerServiceManager;
import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaModel;
import com.tasklion.backend.features.taskerService.serviceArea.service.ServiceAreaService;
import com.tasklion.backend.features.taskerService.serviceReview.model.RatingDetailModel;
import com.tasklion.backend.features.tasklionUser.tasker.model.*;
import com.tasklion.backend.features.tasklionUser.tasker.service.TaskerManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}" + ApiEndpoint.TASKER)
public class TaskerController {

    private final TaskerManager taskerManager;
    private final TaskerServiceManager taskerServiceManager;
    private final TaskerAvailabilityService taskerAvailabilityService;
    private final TaskService taskService;
    private final ServiceAreaService serviceAreaService;

    @GetMapping
    public ResponseEntity<SuccessResponseModel<Page<TaskerModel>>> getTaskers(
            @ModelAttribute PaginationModel paginationModel) {
        log.info("GET [{}] - getTaskers({})", ApiEndpoint.TASKER, paginationModel);
        return ResponseEntity.ok(SuccessResponseModel.<Page<TaskerModel>>builder()
                .data(taskerManager.getTaskers(paginationModel))
                .build());
    }

    @GetMapping("/{username}")
    public ResponseEntity<SuccessResponseModel<TaskerModel>> getTasker(@PathVariable String username) {
        log.info("GET [{}] - getTasker()", ApiEndpoint.TASKER + "/" + username);
        return ResponseEntity.ok(SuccessResponseModel.<TaskerModel>builder()
                .data(taskerManager.getTasker(username))
                .build());
    }

    @GetMapping("/{username}" + ApiEndpoint.RATING)
    public ResponseEntity<SuccessResponseModel<RatingDetailModel>> getRatingByUsername(@PathVariable String username) {
        log.info("GET [{}] - getRatingByUsername()", ApiEndpoint.TASKER + "/" + username + ApiEndpoint.RATING);
        return ResponseEntity.ok(SuccessResponseModel.<RatingDetailModel>builder()
                .data(taskerManager.getRatingByUsername(username))
                .build());
    }

    @GetMapping("/{username}" + ApiEndpoint.SERVICES)
    public ResponseEntity<SuccessResponseModel<Page<TaskerServiceModel>>> getTaskerServices(
            @PathVariable String username, @ModelAttribute PaginationModel paginationModel) {
        log.info("GET [{}] - getTaskerServices({})", ApiEndpoint.TASKER + "/" + username + ApiEndpoint.SERVICES, paginationModel);
        return ResponseEntity.ok(SuccessResponseModel.<Page<TaskerServiceModel>>builder()
                .data(taskerServiceManager.getTaskerServicesByUsername(username, paginationModel))
                .build());
    }

    @PostMapping(ApiEndpoint.REGISTER)
    public ResponseEntity<SuccessResponseModel<AuthResponseModel>> registerTasker(
            @RequestBody TaskerModel taskerModel) {
        log.info("POST [{}] - registerTasker({})", ApiEndpoint.TASKER + ApiEndpoint.REGISTER, taskerModel);
        SuccessResponseModel<AuthResponseModel> response = SuccessResponseModel.<AuthResponseModel>builder()
                .data(taskerManager.registerTasker(taskerModel))
                .httpStatus(HttpStatus.CREATED.value())
                .status(HttpStatus.CREATED.getReasonPhrase())
                .build();
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    @PostMapping(ApiEndpoint.SETUP)
    public ResponseEntity<SuccessResponseModel<AuthResponseModel>> setupTasker(
            @RequestBody(required = false) TaskerSetupModel taskerSetupModel) {
        log.info("POST [{}] - setupTasker({})", ApiEndpoint.TASKER + ApiEndpoint.SETUP, taskerSetupModel);
        SuccessResponseModel<AuthResponseModel> response = SuccessResponseModel.<AuthResponseModel>builder()
                .data(taskerManager.setupTasker(taskerSetupModel))
                .build();
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    @PutMapping("/{username}")
    public ResponseEntity<SuccessResponseModel<TaskerDetailModel>> updateTaskerDetail(
            @PathVariable String username, @RequestBody TaskerDetailModel taskerDetailModel) {
        log.info("PUT [{}] - updateTaskerDetail({})", ApiEndpoint.TASKER + "/" + username, taskerDetailModel);
        return ResponseEntity.ok(SuccessResponseModel.<TaskerDetailModel>builder()
                .data(taskerManager.updateTaskerDetail(username, taskerDetailModel))
                .build());
    }

    @GetMapping("/{username}" + ApiEndpoint.SERVICE_AREA)
    public ResponseEntity<SuccessResponseModel<Page<ServiceAreaModel>>> getTaskerServiceAreas(
            @PathVariable String username, @ModelAttribute PaginationModel paginationModel) {
        log.info("GET [{}] - getTaskerServiceAreas({})", ApiEndpoint.TASKER + "/" + username + ApiEndpoint.SERVICE_AREA, paginationModel);
        return ResponseEntity.ok(SuccessResponseModel.<Page<ServiceAreaModel>>builder()
                .data(serviceAreaService.getServiceAreas(username, paginationModel))
                .build());
    }


    @GetMapping("/{username}" + ApiEndpoint.SERVICE_AREA + ApiEndpoint.OPTIONS)
    public ResponseEntity<SuccessResponseModel<Map<String, Map<String, List<String>>>>> getTaskerServiceAreaOptions(
            @PathVariable String username) {
        log.info("GET [{}] - getTaskerServiceAreaOptions()",
                ApiEndpoint.TASKER + "/" + username + ApiEndpoint.SERVICE_AREA + ApiEndpoint.OPTIONS);
        return ResponseEntity.ok(SuccessResponseModel.<Map<String, Map<String, List<String>>>>builder()
                .data(serviceAreaService.getServiceAreaOptions(username))
                .build());
    }

    @PostMapping("/{username}" + ApiEndpoint.SERVICE_AREA)
    public ResponseEntity<SuccessResponseModel<ServiceAreaModel>> createServiceArea(
            @PathVariable String username, @RequestBody ServiceAreaModel serviceAreaModel) {
        log.info("POST [{}] - createServiceArea({})", ApiEndpoint.TASKER + "/" + username + ApiEndpoint.SERVICE_AREA, serviceAreaModel);
        return ResponseEntity.ok(SuccessResponseModel.<ServiceAreaModel>builder()
                .data(serviceAreaService.createServiceArea(username, serviceAreaModel))
                .build());
    }

    @GetMapping("/{username}" + ApiEndpoint.TASKS)
    public ResponseEntity<SuccessResponseModel<Page<TaskerTaskModel>>> getTasks(
            @PathVariable String username, @ModelAttribute TaskRequestModel taskRequestModel) {
        log.info("GET [{}] - getTasksByStatus({})", ApiEndpoint.TASKER + "/" + username + ApiEndpoint.TASKS, taskRequestModel);
        return ResponseEntity.ok(SuccessResponseModel.<Page<TaskerTaskModel>>builder()
                .data(taskService.getTaskerTasks(username, taskRequestModel))
                .build());
    }

    @PostMapping("/{username}" + ApiEndpoint.TASKS)
    public ResponseEntity<SuccessResponseModel<Long>> createTask(
            @PathVariable String username, @RequestBody CommonTaskRequestModel commonTaskRequestModel) {
        log.info("POST [{}] - createTask({})", ApiEndpoint.TASKER + "/" + username + ApiEndpoint.TASKS, commonTaskRequestModel);
        return ResponseEntity.ok(SuccessResponseModel.<Long>builder()
                .data(taskService.createTask(username, commonTaskRequestModel))
                .build());
    }

    @GetMapping("/{username}" + ApiEndpoint.AVAILABILITY + ApiEndpoint.BY_DAY)
    public ResponseEntity<SuccessResponseModel<Map<String, List<TaskerAvailabilityDetailModel>>>> getTaskerAvailabilitiesByDay(
            @PathVariable String username) {
        log.info("GET [{}] - getTaskerAvailabilitiesByDay()", ApiEndpoint.TASKER + "/" + username + ApiEndpoint.AVAILABILITY + ApiEndpoint.BY_DAY);
        return ResponseEntity.ok(SuccessResponseModel.<Map<String, List<TaskerAvailabilityDetailModel>>>builder()
                .data(taskerAvailabilityService.getTaskerAvailabilitiesByDay(username))
                .build());
    }

    @GetMapping("/{username}" + ApiEndpoint.AVAILABILITY)
    public ResponseEntity<SuccessResponseModel<Map<String, Set<String>>>> getTaskerAvailabilities(
            @PathVariable String username, @RequestParam int taskDuration, @RequestParam(required = false) Long excludingTaskId) {
        log.info("GET [{}] - getTaskerAvailabilities()", ApiEndpoint.TASKER + "/" + username + ApiEndpoint.AVAILABILITY +
                "?taskDuration=" + taskDuration);
        return ResponseEntity.ok(SuccessResponseModel.<Map<String, Set<String>>>builder()
                .data(taskerAvailabilityService.getTaskerAvailabilitiesByDate(username, taskDuration, excludingTaskId))
                .build());
    }

//    @GetMapping("/{username}" + ApiEndpoint.AVAILABILITY + ApiEndpoint.SCHEDULE)
//    public ResponseEntity<SuccessResponseModel<Map<String, List<TaskerScheduledAvailabilityModel>>>> getTaskerAvailabilitySchedule(
//            @PathVariable String username, @RequestParam(required = false) String date) {
//        log.info("GET [{}] - getTaskerAvailabilitySchedule()", ApiEndpoint.TASKER + "/" + username +
//                ApiEndpoint.AVAILABILITY + ApiEndpoint.SCHEDULE);
//        return ResponseEntity.ok(SuccessResponseModel.<Map<String, List<TaskerScheduledAvailabilityModel>>>builder()
//                .data(taskerAvailabilityService.getTaskerAvailabilitySchedule(username, date))
//                .build());
//    }

    @PostMapping("/{username}" + ApiEndpoint.AVAILABILITY)
    public ResponseEntity<SuccessResponseModel<Void>> addTaskerAvailability(
            @PathVariable String username, @RequestBody TaskerAvailabilityGenericModel taskerAvailabilityGenericModel) {
        log.info("POST [{}] - addTaskerAvailability({})", ApiEndpoint.TASKER + "/" + username + ApiEndpoint.AVAILABILITY,
                taskerAvailabilityGenericModel);
        taskerAvailabilityService.addTaskerAvailability(username, taskerAvailabilityGenericModel);
        return ResponseEntity.ok(SuccessResponseModel.<Void>builder()
                .build());
    }

    @GetMapping(ApiEndpoint.SEARCH)
    public ResponseEntity<SuccessResponseModel<Page<SearchTaskerResponseModel>>> searchTasker(
            @ModelAttribute SearchTaskerRequestModel searchTaskerRequestModel) {
        log.info("GET [{}] - searchTasker({})", ApiEndpoint.TASKER + ApiEndpoint.SEARCH, searchTaskerRequestModel);
        return ResponseEntity.ok(SuccessResponseModel.<Page<SearchTaskerResponseModel>>builder()
                .data(taskerManager.searchTasker(searchTaskerRequestModel))
                .build());
    }

    @GetMapping(ApiEndpoint.COUNT)
    public ResponseEntity<SuccessResponseModel<Long>> getTaskerTotalCount() {
        log.info("GET [{}] - getTaskerTotalCount()", ApiEndpoint.TASKER + ApiEndpoint.COUNT);
        return ResponseEntity.ok(SuccessResponseModel.<Long>builder()
                .data(taskerManager.getTaskerCount())
                .build());
    }

}
