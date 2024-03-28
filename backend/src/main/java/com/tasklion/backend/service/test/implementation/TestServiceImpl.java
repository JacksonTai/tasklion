package com.tasklion.backend.service.test.implementation;

import com.tasklion.backend.service.test.TestService;
import org.springframework.stereotype.Service;

@Service
public class TestServiceImpl implements TestService {

    @Override
    public String test() {
        return "Hello, World!";
    }
}
