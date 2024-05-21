package com.tasklion.backend.mapper;

import com.tasklion.backend.domain.entity.Role;
import com.tasklion.backend.domain.entity.UserRole;
import org.mapstruct.Named;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public interface BaseUserMapper {

    @Named("mapUserRolesToStringRoles")
    default Set<String> mapUserRolesToStringRoles(Set<UserRole> userRoles) {
        if (userRoles == null || userRoles.isEmpty()) {
            return new HashSet<>();
        }
        return userRoles.stream()
                .map(userRole -> "ROLE_" + userRole.getRole().getName())
                .collect(Collectors.toSet());
    }

    @Named("mapStringRolesToUserRoles")
    default Set<UserRole> mapStringRolesToUserRoles(Set<String> roles) {
        if (roles == null || roles.isEmpty()) {
            return new HashSet<>();
        }
        return roles.stream()
                .map(role -> UserRole.builder()
                        .role(Role.builder().name(role.replace("ROLE_", "")).build())
                        .build())
                .collect(Collectors.toSet());
    }

}

