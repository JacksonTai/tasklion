package com.tasklion.backend.features.tasklionAccount.userRole.service;


import com.tasklion.backend.common.constant.TasklionUserRole;
import com.tasklion.backend.common.exception.ResourceNotFoundException;
import com.tasklion.backend.features.tasklionAccount.TasklionAccount;
import com.tasklion.backend.features.tasklionAccount.role.Role;
import com.tasklion.backend.features.tasklionAccount.role.RoleRepo;
import com.tasklion.backend.features.tasklionAccount.userRole.UserRole;
import com.tasklion.backend.features.tasklionAccount.userRole.UserRoleRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserRoleServiceImpl implements UserRoleService {

    private final UserRoleRepo userRoleRepo;
    private final RoleRepo roleRepo;

    @Override
    public TasklionAccount addUserRole(TasklionAccount tasklionAccount, TasklionUserRole tasklionUserRole) {
        Role role = roleRepo.findByName(tasklionUserRole.name())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + tasklionUserRole.name()));
        tasklionAccount.getUserRoles().add(UserRole.builder().role(role).build());
        tasklionAccount.getUserRoles().forEach(userRole -> {
            userRole.setTasklionAccount(tasklionAccount);
            userRoleRepo.save(userRole);
        });
        return tasklionAccount;
    }

}
