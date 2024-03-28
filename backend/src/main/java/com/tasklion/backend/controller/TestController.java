package com.tasklion.backend.controller;

import com.tasklion.backend.service.test.implementation.TestServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private TestServiceImpl testService;

    @GetMapping
    public String test() {
        return testService.test();
    }

}
