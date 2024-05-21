package com.tasklion.backend.controller;

import com.tasklion.backend.model.FieldValueModel;
import com.tasklion.backend.model.TasklionUserModel;
import com.tasklion.backend.model.api.SuccessResponseModel;
import com.tasklion.backend.service.TasklionUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}/user")
public class TasklionUserController {

    private final TasklionUserService tasklionUserService;

    @PostMapping("/is-exists")
    public ResponseEntity<SuccessResponseModel<Boolean>> isExists(@RequestBody FieldValueModel fieldValueModel) {
        log.info("POST [/user/is-exists] fieldValueModel: {}", fieldValueModel);
        return ResponseEntity.ok(SuccessResponseModel.<Boolean>builder()
                .data(tasklionUserService.isExists(fieldValueModel))
                .build());
    }

    @GetMapping
    public ResponseEntity<SuccessResponseModel<TasklionUserModel>> getTasklionUser(@RequestParam String username) {
        log.info("GET [/user]");
        return ResponseEntity.ok(SuccessResponseModel.<TasklionUserModel>builder()
                .data(tasklionUserService.getTasklionUser(username))
                .build());
    }

}
