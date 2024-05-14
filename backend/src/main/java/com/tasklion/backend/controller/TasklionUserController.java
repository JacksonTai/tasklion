package com.tasklion.backend.controller;

import com.tasklion.backend.model.FieldValueModel;
import com.tasklion.backend.model.api.SuccessResponseModel;
import com.tasklion.backend.service.TasklionUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}/tasklion-user")
public class TasklionUserController {

    private final TasklionUserService tasklionUserService;

    @PostMapping("/is-exists")
    public ResponseEntity<SuccessResponseModel<Boolean>> isExists(@RequestBody FieldValueModel fieldValueModel) {
        log.info("[/tasklion-user/is-exists] field: {}, value: {}", fieldValueModel.getField(),
                fieldValueModel.getValue());
        return ResponseEntity.ok(SuccessResponseModel.<Boolean>builder()
                .data(tasklionUserService.isExists(fieldValueModel))
                .build());
    }

}
