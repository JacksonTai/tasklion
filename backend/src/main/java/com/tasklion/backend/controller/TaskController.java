package com.tasklion.backend.controller;

import com.tasklion.backend.domain.entity.Task;
import com.tasklion.backend.model.ApiResponseModel;
import com.tasklion.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}/tasks")
public class TaskController {

    private final Logger logger = Logger.getLogger(TaskController.class.getName());
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<ApiResponseModel<List<Task>>> getAllTask() {
        logger.info("[/tasks]");
        return ResponseEntity.ok(ApiResponseModel.<List<Task>>builder()
                .status(HttpStatus.OK.getReasonPhrase())
                .httpStatus(HttpStatus.OK.value())
                .data(taskService.findAllTask())
                .build());
    }

}
