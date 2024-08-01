package com.tasklion.backend.features.tasklionAccount.userRole;

import com.tasklion.backend.features.tasklionAccount.role.Role;
import com.tasklion.backend.features.tasklionAccount.role.RoleRepo;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import javax.management.relation.RoleNotFoundException;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public abstract class UserRoleMapper {

    @Autowired
    protected RoleRepo roleRepo;

    @Named("mapUserRolesToStringRoles")
    public Set<String> mapUserRolesToStringRoles(Set<UserRole> userRoles) {
        if (userRoles == null || userRoles.isEmpty()) {
            return new HashSet<>();
        }
        return userRoles.stream()
                .map(userRole -> "ROLE_" + userRole.getRole().getName())
                .collect(Collectors.toSet());
    }

    @Named("mapStringRolesToUserRoles")
    public Set<UserRole> mapStringRolesToUserRoles(Set<String> roles) {
        if (roles == null || roles.isEmpty()) {
            return new HashSet<>();
        }
        return roles.stream()
                .map(this::mapStringToUserRole)
                .collect(Collectors.toSet());
    }

    private UserRole mapStringToUserRole(String role) {
        try {
            Role roleEntity = roleRepo.findByName(role.replace("ROLE_", ""))
                    .orElseThrow(() -> new RoleNotFoundException("Role not found: " + role));
            return UserRole.builder()
                    .role(roleEntity)
                    .build();
        } catch (RoleNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

}

