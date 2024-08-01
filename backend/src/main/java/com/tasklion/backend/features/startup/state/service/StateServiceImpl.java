package com.tasklion.backend.features.startup.state.service;

import com.tasklion.backend.features.startup.state.State;
import com.tasklion.backend.features.startup.state.StateRepo;
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
