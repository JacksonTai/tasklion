package com.tasklion.backend.service.impl;

import com.tasklion.backend.domain.repository.TasklionUserRepo;
import com.tasklion.backend.model.FieldValueModel;
import com.tasklion.backend.service.TasklionUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TasklionUserServiceImpl implements TasklionUserService, UserDetailsService {

    private final TasklionUserRepo tasklionUserRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return tasklionUserRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public boolean isExists(FieldValueModel fieldValueModel) {
        String value = fieldValueModel.getValue();
        String field = fieldValueModel.getField();
        return switch (field) {
            case "username" -> tasklionUserRepo.existsByUsername(value);
            case "email" -> tasklionUserRepo.existsByEmail(value);
            default -> throw new IllegalArgumentException("Invalid field: " + field);
        };
    }
}
