package com.tasklion.backend.controller;

import com.tasklion.backend.domain.entity.Task;
import com.tasklion.backend.model.ApiResponseModel;
import com.tasklion.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}/tasks")
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<ApiResponseModel<List<Task>>> getAllTask() {
        log.info("[/tasks]");
        return ResponseEntity.ok(ApiResponseModel.<List<Task>>builder()
                .data(taskService.findAllTask())
                .status(HttpStatus.OK.getReasonPhrase())
                .httpStatus(HttpStatus.OK.value())
                .build());
    }

}
