package com.tasklion.backend.service.impl;

import com.tasklion.backend.domain.entity.State;
import com.tasklion.backend.domain.repository.StateRepo;
import com.tasklion.backend.service.StateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StateServiceImpl implements StateService {

    private final StateRepo stateRepo;

    @Override
    public List<State> findAllState() {
        return stateRepo.findAll();
    }

}
