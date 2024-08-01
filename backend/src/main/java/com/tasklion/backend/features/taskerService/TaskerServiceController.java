package com.tasklion.backend.features.taskerService;

import com.tasklion.backend.common.constant.ApiEndpoint;
import com.tasklion.backend.common.model.KeyValueModel;
import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.common.model.api.SuccessResponseModel;
import com.tasklion.backend.features.taskerService.model.CreateTaskerServiceRequestModel;
import com.tasklion.backend.features.taskerService.model.TaskerServiceModel;
import com.tasklion.backend.features.taskerService.service.TaskerServiceManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}" + ApiEndpoint.SERVICES)
public class TaskerServiceController {

    private final TaskerServiceManager taskerServiceManager;

    @GetMapping
    public ResponseEntity<SuccessResponseModel<Page<TaskerServiceModel>>> getTaskerServices(
            @ModelAttribute PaginationModel paginationModel) {
        log.info("POST [{}] - getTaskerServices({})", ApiEndpoint.SERVICES, paginationModel);
        return ResponseEntity.ok(SuccessResponseModel.<Page<TaskerServiceModel>>builder()
                .data(taskerServiceManager.getTaskerServices(paginationModel))
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuccessResponseModel<TaskerServiceModel>> getTaskerServiceById(@PathVariable Long id) {
        log.info("GET [{}] - getTaskerServiceById({})", ApiEndpoint.SERVICES + "/" + id, id);
        TaskerServiceModel taskerServiceModel = taskerServiceManager.getTaskerServiceById(id);
        return ResponseEntity.ok(SuccessResponseModel.<TaskerServiceModel>builder()
                .data(taskerServiceModel)
                .build());
    }

    @PostMapping
    public ResponseEntity<SuccessResponseModel<List<Long>>> createTaskerService(
            @RequestBody CreateTaskerServiceRequestModel createTaskerServiceRequestModel) {
        log.info("POST [{}] - createTaskerService({})", ApiEndpoint.SERVICES, createTaskerServiceRequestModel);
        return ResponseEntity.ok(SuccessResponseModel.<List<Long>>builder()
                .data(taskerServiceManager.createTaskerServices(createTaskerServiceRequestModel))
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponseModel<TaskerServiceModel>> updateTaskerService(
            @PathVariable Long id, @RequestBody TaskerServiceModel taskerServiceModel) {
        log.info("PUT [{}] - updateTaskerService({})", ApiEndpoint.SERVICES + "/" + id, taskerServiceModel);
        return ResponseEntity.ok(SuccessResponseModel.<TaskerServiceModel>builder()
                .data(taskerServiceManager.updateTaskerService(id, taskerServiceModel))
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponseModel<TaskerServiceModel>> deleteTaskerService(@PathVariable Long id) {
        log.info("DELETE [{}] - deleteTaskerService({})", ApiEndpoint.SERVICES + "/" + id, id);
        taskerServiceManager.deleteTaskerService(id);
        return ResponseEntity.ok(SuccessResponseModel.<TaskerServiceModel>builder()
                .build());
    }

    @GetMapping(ApiEndpoint.MOST_OFFERED)
    public ResponseEntity<SuccessResponseModel<List<KeyValueModel<Long>>>> getMostOfferedTaskerServices() {
        log.info("GET [{}] - getMostOfferedTaskerServices()", ApiEndpoint.SERVICES + ApiEndpoint.MOST_OFFERED);
        return ResponseEntity.ok(SuccessResponseModel.<List<KeyValueModel<Long>>>builder()
                .data(taskerServiceManager.getMostOfferedTaskerServices())
                .build());
    }

}
