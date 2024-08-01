package com.tasklion.backend.features.taskerService.serviceArea;

import com.tasklion.backend.common.constant.ApiEndpoint;
import com.tasklion.backend.common.model.api.SuccessResponseModel;
import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaModel;
import com.tasklion.backend.features.taskerService.serviceArea.service.ServiceAreaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}" + ApiEndpoint.SERVICE_AREA)
public class ServiceAreaController {

    private final ServiceAreaService serviceAreaService;

    @GetMapping
    public ResponseEntity<SuccessResponseModel<List<ServiceAreaModel>>> getServiceAreas(@RequestParam String username) {
        log.info("GET [{}] - getServiceAreas({})", ApiEndpoint.SERVICE_AREA, username);
        return ResponseEntity.ok(SuccessResponseModel.<List<ServiceAreaModel>>builder()
                .data(serviceAreaService.getServiceAreas(username))
                .build());
    }

    @GetMapping("{serviceAreaId}")
    public ResponseEntity<SuccessResponseModel<ServiceAreaModel>> getServiceArea(@PathVariable Long serviceAreaId) {
        log.info("GET [{}] - getServiceArea({})", ApiEndpoint.SERVICE_AREA + "/" + serviceAreaId, serviceAreaId);
        return ResponseEntity.ok(SuccessResponseModel.<ServiceAreaModel>builder()
                .data(serviceAreaService.getServiceArea(serviceAreaId))
                .build());
    }

    @PutMapping("/{serviceAreaId}")
    public ResponseEntity<SuccessResponseModel<ServiceAreaModel>> updateServiceArea(
            @PathVariable Long serviceAreaId, @RequestBody ServiceAreaModel serviceAreaModel) {
        log.info("PUT [{}] - updateServiceArea({}, {})", ApiEndpoint.SERVICE_AREA + "/" + serviceAreaId, serviceAreaId, serviceAreaModel);
        return ResponseEntity.ok(SuccessResponseModel.<ServiceAreaModel>builder()
                .data(serviceAreaService.updateServiceArea(serviceAreaId, serviceAreaModel))
                .build());
    }

    @DeleteMapping("/{serviceAreaId}")
    public ResponseEntity<SuccessResponseModel<Void>> deleteTaskerServiceArea(@PathVariable Long serviceAreaId) {
        log.info("DELETE [{}] - deleteTaskerServiceArea({})", ApiEndpoint.SERVICE_AREA + "/" + serviceAreaId, serviceAreaId);
        serviceAreaService.deleteServiceArea(serviceAreaId);
        return ResponseEntity.ok(SuccessResponseModel.<Void>builder()
                .build());
    }

}
