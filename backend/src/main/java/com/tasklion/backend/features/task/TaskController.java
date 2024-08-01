package com.tasklion.backend.features.task;

import com.tasklion.backend.common.constant.ApiEndpoint;
import com.tasklion.backend.common.model.KeyValueModel;
import com.tasklion.backend.common.model.api.SuccessResponseModel;
import com.tasklion.backend.features.task.model.CommonTaskModel;
import com.tasklion.backend.features.task.model.CommonTaskRequestModel;
import com.tasklion.backend.features.task.service.TaskService;
import com.tasklion.backend.security.jwt.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}" + ApiEndpoint.TASKS)
public class TaskController {

    private final TaskService taskService;
    private final JwtService jwtService;

    @GetMapping("/{taskId}")
    public ResponseEntity<SuccessResponseModel<CommonTaskModel>> getTask(
            HttpServletRequest request, @PathVariable Long taskId, @RequestParam(required = false) boolean isUpdateView) {
        log.info("GET [{}] - getTask({}, {})", ApiEndpoint.TASKS, taskId, isUpdateView);
        String jwt = request.getHeader(HttpHeaders.AUTHORIZATION).substring(7);
        String currentRole = jwtService.extractCurrentRole(jwt);
        return ResponseEntity.ok(SuccessResponseModel.<CommonTaskModel>builder()
                .data(taskService.getTask(currentRole, taskId, isUpdateView))
                .build());
    }

    @GetMapping(ApiEndpoint.COUNT + ApiEndpoint.BY_STATUS)
    public ResponseEntity<SuccessResponseModel<List<KeyValueModel<Long>>>> countTasksByStatus() {
        log.info("GET [{}] - countTasksByStatus()", ApiEndpoint.TASKS);
        return ResponseEntity.ok(SuccessResponseModel.<List<KeyValueModel<Long>>>builder()
                .data(taskService.countTasksByStatus())
                .build());
    }

    @PutMapping("/{taskId}" + ApiEndpoint.STATUS)
    public ResponseEntity<SuccessResponseModel<CommonTaskModel>> updateTaskStatus(
            @PathVariable Long taskId, @RequestBody String status) {
        log.info("PUT [{}] - updateTaskStatus({}, {})", ApiEndpoint.TASKS, taskId, status);
        return ResponseEntity.ok(SuccessResponseModel.<CommonTaskModel>builder()
                .data(taskService.updateTaskStatus(taskId, status))
                .build());
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<SuccessResponseModel<CommonTaskModel>> updateTask(
            HttpServletRequest request, @PathVariable Long taskId, @RequestBody CommonTaskRequestModel commonTaskRequestModel) {
        log.info("PUT [{}] - updateTask({}, {})", ApiEndpoint.TASKS, taskId, commonTaskRequestModel);
        String jwt = request.getHeader(HttpHeaders.AUTHORIZATION).substring(7);
        String currentRole = jwtService.extractCurrentRole(jwt);
        return ResponseEntity.ok(SuccessResponseModel.<CommonTaskModel>builder()
                .data(taskService.updateTask(currentRole, taskId, commonTaskRequestModel))
                .build());
    }

    @PutMapping(ApiEndpoint.ACCEPT)
    public ResponseEntity<SuccessResponseModel<Void>> acceptTaskChangeRequest(@RequestBody Long makerCheckerId) {
        log.info("PUT [{}] - acceptTaskChangeRequest({})", ApiEndpoint.TASKS, makerCheckerId);
        taskService.acceptTaskChangeRequest(makerCheckerId);
        return ResponseEntity.ok(SuccessResponseModel.<Void>builder()
                .build());
    }

    @PutMapping(ApiEndpoint.REJECT)
    public ResponseEntity<SuccessResponseModel<Void>> rejectTaskChangeRequest(@RequestBody Long makerCheckerId) {
        log.info("PUT [{}] - rejectTaskChangeRequest({})", ApiEndpoint.TASKS, makerCheckerId);
        taskService.rejectTaskChangeRequest(makerCheckerId);
        return ResponseEntity.ok(SuccessResponseModel.<Void>builder()
                .build());
    }

    @PutMapping(ApiEndpoint.CANCEL)
    public ResponseEntity<SuccessResponseModel<Void>> cancelTaskChangeRequest(@RequestBody Long makerCheckerId) {
        log.info("PUT [{}] - cancelTaskChangeRequest({})", ApiEndpoint.TASKS, makerCheckerId);
        taskService.cancelTaskChangeRequest(makerCheckerId);
        return ResponseEntity.ok(SuccessResponseModel.<Void>builder()
                .build());
    }

}
