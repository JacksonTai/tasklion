package com.tasklion.backend.features.tasklionAccount.service;

import com.tasklion.backend.common.constant.ApiMessage;
import com.tasklion.backend.common.constant.TasklionUserRole;
import com.tasklion.backend.common.exception.ResourceNotFoundException;
import com.tasklion.backend.common.model.KeyValueModel;
import com.tasklion.backend.features.personalDetail.PersonalDetail;
import com.tasklion.backend.features.personalDetail.PersonalDetailMapper;
import com.tasklion.backend.features.personalDetail.PersonalDetailModel;
import com.tasklion.backend.features.personalDetail.PersonalDetailRepo;
import com.tasklion.backend.features.task.service.TaskService;
import com.tasklion.backend.features.tasklionAccount.TasklionAccount;
import com.tasklion.backend.features.tasklionAccount.TasklionAccountMapper;
import com.tasklion.backend.features.tasklionAccount.TasklionAccountRepo;
import com.tasklion.backend.features.tasklionAccount.constant.TasklionAccountStatus;
import com.tasklion.backend.features.tasklionAccount.model.ChangePasswordRequestModel;
import com.tasklion.backend.features.tasklionAccount.model.TasklionAccountDetailsModel;
import com.tasklion.backend.features.tasklionAccount.model.TasklionAccountModel;
import com.tasklion.backend.features.tasklionAccount.userRole.service.UserRoleService;
import com.tasklion.backend.security.token.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TasklionAccountServiceImpl implements TasklionAccountService {

    private final UserRoleService userRoleService;
    private final TokenService tokenService;
    private final TaskService taskService;

    private final TasklionAccountRepo tasklionAccountRepo;
    private final PersonalDetailRepo personalDetailRepo;

    private final TasklionAccountMapper tasklionAccountMapper;
    private final PersonalDetailMapper personalDetailMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public TasklionAccount saveTasklionAccount(TasklionAccount tasklionAccount, TasklionUserRole tasklionUserRole) {
        tasklionAccount.setPassword(passwordEncoder.encode(tasklionAccount.getPassword()));
        tasklionAccount.setStatus(TasklionAccountStatus.ACTIVE.name());
        TasklionAccount savedTasklionAccount = tasklionAccountRepo.save(tasklionAccount);
        return userRoleService.addUserRole(savedTasklionAccount, tasklionUserRole);
    }

    @Override
    public TasklionAccountModel getTasklionAccount(String username) {
        return tasklionAccountRepo.findByUsername(username)
                .map(tasklionAccountMapper::toModel)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
    }

    @Override
    public TasklionAccountDetailsModel getTasklionAccountDetail(String username) {
        TasklionAccountModel tasklionAccountModel = getTasklionAccount(username);
        PersonalDetailModel personalDetailModel = personalDetailRepo.findByTasklionAccountUsername(username)
                .map(personalDetailMapper::toModel)
                .orElseThrow(() -> new ResourceNotFoundException("Personal Detail not found"));
        return TasklionAccountDetailsModel.builder()
                .tasklionAccount(tasklionAccountModel)
                .personalDetail(personalDetailModel)
                .build();
    }

    @Override
    public boolean isExists(KeyValueModel<String> keyValueModel) {
        String value = keyValueModel.getValue().trim();
        String field = keyValueModel.getField().trim();
        return switch (field) {
            case "fullName" -> personalDetailRepo.existsByFullNameIgnoreCase(value);
            case "phoneNumber" -> personalDetailRepo.existsByPhoneNumber(value);
            case "username" -> tasklionAccountRepo.existsByUsernameIgnoreCase(value);
            case "email" -> tasklionAccountRepo.existsByEmailIgnoreCase(value);
            default -> throw new IllegalArgumentException("Invalid field: " + field);
        };
    }

    @Override
    public void updateTasklionAccountStatus(String username, String status) {
        TasklionAccount tasklionAccount = tasklionAccountRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        tasklionAccount.setStatus(status);
        TasklionAccount savedTasklionAccount = tasklionAccountRepo.save(tasklionAccount);
        taskService.cancelTasks(username);
        tokenService.revokeUserTokens(savedTasklionAccount);
    }

    @Override
    public TasklionAccountDetailsModel updateTasklionAccountDetail(
            String username, TasklionAccountDetailsModel tasklionAccountDetailsModel) {

        TasklionAccountModel tasklionAccountModel = tasklionAccountDetailsModel.getTasklionAccount();
        PersonalDetailModel personalDetailModel = tasklionAccountDetailsModel.getPersonalDetail();

        TasklionAccount tasklionAccount = tasklionAccountRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        PersonalDetail personalDetail = personalDetailRepo.findByTasklionAccountUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Personal Detail not found"));

        tasklionAccount.setEmail(tasklionAccountModel.getEmail());
        tasklionAccountRepo.save(tasklionAccount);

        personalDetail.setFullName(personalDetailModel.getFullName());
        personalDetail.setPhoneNumber(personalDetailModel.getPhoneNumber());
        personalDetail.setDateOfBirth(LocalDate.parse(personalDetailModel.getDateOfBirth()));
        personalDetailRepo.save(personalDetail);

        return TasklionAccountDetailsModel.builder()
                .tasklionAccount(tasklionAccountModel)
                .personalDetail(personalDetailModel)
                .build();
    }

    @Override
    public boolean changePassword(String username, ChangePasswordRequestModel changePasswordRequestModel) {
        TasklionAccount tasklionAccount = tasklionAccountRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        if (!passwordEncoder.matches(changePasswordRequestModel.getPassword(), tasklionAccount.getPassword())) {
            throw new BadCredentialsException(ApiMessage.INVALID_PASSWORD.getMessage());
        }
        tasklionAccount.setPassword(passwordEncoder.encode(changePasswordRequestModel.getNewPassword()));
        tasklionAccountRepo.save(tasklionAccount);
        return true;
    }

}
