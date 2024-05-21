package com.tasklion.backend.service.impl;

import com.tasklion.backend.domain.repository.TaskerRepo;
import com.tasklion.backend.service.TaskerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskerServiceImpl implements TaskerService {

    private final TaskerRepo taskerRepo;

}
