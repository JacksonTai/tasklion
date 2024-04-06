package com.tasklion.backend.service.impl;

import com.tasklion.backend.service.TestService;
import org.springframework.stereotype.Service;

@Service
public class TestServiceImpl implements TestService {

    @Override
    public String test() {
        return "Hello, World!";
    }
}
