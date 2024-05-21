package com.tasklion.backend.service.impl;

import com.tasklion.backend.domain.repository.CustomerRepo;
import com.tasklion.backend.domain.repository.TasklionUserRepo;
import com.tasklion.backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepo customerRepo;
    private final TasklionUserRepo tasklionUserRepo;

}
