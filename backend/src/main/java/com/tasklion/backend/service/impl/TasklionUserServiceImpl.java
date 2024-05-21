package com.tasklion.backend.service.impl;

import com.tasklion.backend.domain.repository.PersonalDetailRepo;
import com.tasklion.backend.domain.repository.TasklionUserRepo;
import com.tasklion.backend.exception.ResourceNotFoundException;
import com.tasklion.backend.mapper.TasklionUserMapper;
import com.tasklion.backend.model.FieldValueModel;
import com.tasklion.backend.model.TasklionUserModel;
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
    private final PersonalDetailRepo personalDetailRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return tasklionUserRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public boolean isExists(FieldValueModel fieldValueModel) {
        String value = fieldValueModel.getValue().trim();
        String field = fieldValueModel.getField().trim();
        return switch (field) {
            case "fullName" -> personalDetailRepo.existsByFullNameContainingIgnoreCase(value);
            case "phoneNumber" -> personalDetailRepo.existsByPhoneNumber(value);
            case "username" -> tasklionUserRepo.existsByUsernameIgnoreCase(value);
            case "email" -> tasklionUserRepo.existsByEmailIgnoreCase(value);
            default -> throw new IllegalArgumentException("Invalid field: " + field);
        };
    }

    @Override
    public TasklionUserModel getTasklionUser(String username) {
        return tasklionUserRepo.findByUsername(username)
                .map(TasklionUserMapper.INSTANCE::toModel)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

}
