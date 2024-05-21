package com.tasklion.backend.controller;

import com.tasklion.backend.service.TaskerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}/tasker")
public class TaskerController {

    private final TaskerService taskerService;

}
