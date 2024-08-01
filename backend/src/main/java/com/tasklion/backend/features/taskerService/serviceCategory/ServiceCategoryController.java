package com.tasklion.backend.features.taskerService.serviceCategory;

import com.tasklion.backend.common.constant.ApiEndpoint;
import com.tasklion.backend.common.model.api.SuccessResponseModel;
import com.tasklion.backend.features.taskerService.serviceCategory.service.ServiceCategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}" + ApiEndpoint.SERVICE_CATEGORIES)
public class ServiceCategoryController {

    private final ServiceCategoryService serviceCategoryService;

    @GetMapping
    public ResponseEntity<SuccessResponseModel<List<String>>> getTaskerServiceCategories(
            @RequestParam(required = false) String searchKey) {
        log.info("GET [{}] - getTaskerServiceCategories({})", ApiEndpoint.SERVICE_CATEGORIES, searchKey);
        return ResponseEntity.ok(SuccessResponseModel.<List<String>>builder()
                .data(serviceCategoryService.getTaskerServiceCategories(searchKey))
                .build());
    }

}
