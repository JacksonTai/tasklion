package com.tasklion.backend.features.taskerAvailability;

import com.tasklion.backend.common.constant.ApiEndpoint;
import com.tasklion.backend.common.model.api.SuccessResponseModel;
import com.tasklion.backend.features.taskerAvailability.model.TaskerAvailabilityGenericModel;
import com.tasklion.backend.features.taskerAvailability.service.TaskerAvailabilityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}" + ApiEndpoint.TASKER + ApiEndpoint.AVAILABILITY)
public class TaskerAvailabilityController {

    private final TaskerAvailabilityService taskerAvailabilityService;

    @GetMapping("/{id}")
    public ResponseEntity<SuccessResponseModel<TaskerAvailabilityGenericModel>> getTaskerAvailability(
            @PathVariable Long id, @RequestParam(required = false) boolean isRepeat) {
        log.info("GET [{}] - getTaskerAvailability({})", ApiEndpoint.TASKER + ApiEndpoint.AVAILABILITY + "/" + id,
                isRepeat);
         return ResponseEntity.ok(SuccessResponseModel.<TaskerAvailabilityGenericModel>builder()
                .data(taskerAvailabilityService.getTaskerAvailability(id, isRepeat))
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponseModel<TaskerAvailabilityGenericModel>> updateTaskerAvailability(
            @PathVariable Long id, @RequestBody TaskerAvailabilityGenericModel taskerAvailabilityGenericModel) {
        log.info("PUT [{}] - updateTaskerAvailability({})", ApiEndpoint.TASKER + ApiEndpoint.AVAILABILITY + "/" + id,
                taskerAvailabilityGenericModel);
        return ResponseEntity.ok(SuccessResponseModel.<TaskerAvailabilityGenericModel>builder()
                .data(taskerAvailabilityService.updateTaskerAvailability(id, taskerAvailabilityGenericModel))
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponseModel<Void>> deleteTaskerAvailability(
            @PathVariable Long id, @RequestBody boolean isRepeat) {
        log.info("DELETE [{}] - deleteTaskerAvailability({})", ApiEndpoint.TASKER + ApiEndpoint.AVAILABILITY + "/" + id,
                isRepeat);
        taskerAvailabilityService.deleteTaskerAvailability(id, isRepeat);
        return ResponseEntity.ok(SuccessResponseModel.<Void>builder()
                .build());
    }

}
