package com.tasklion.backend.service;

import com.tasklion.backend.domain.entity.Task;

import java.util.List;

public interface TaskService {

    List<Task> findAllTask();

}
