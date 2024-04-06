package com.tasklion.backend.service.impl;

import com.tasklion.backend.domain.entity.Task;
import com.tasklion.backend.domain.repository.TaskRepo;
import com.tasklion.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepo taskRepo;

    @Override
    public List<Task> findAllTask() {
        return taskRepo.findAll();
    }
}
