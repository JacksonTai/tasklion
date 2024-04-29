package com.tasklion.backend.controller;

import com.tasklion.backend.domain.entity.Task;
import com.tasklion.backend.model.ApiResponseModel;
import com.tasklion.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.server.Http2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<ApiResponseModel<List<Task>>> getAllTask() {
        return ResponseEntity.ok(ApiResponseModel.<List<Task>>builder()
                .status(HttpStatus.OK.getReasonPhrase())
                .httpStatus(HttpStatus.OK.value())
                .data(taskService.findAllTask())
                .build());
    }

}
