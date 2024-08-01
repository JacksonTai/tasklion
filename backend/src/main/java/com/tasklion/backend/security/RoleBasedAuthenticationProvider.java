package com.tasklion.backend.security;

import com.tasklion.backend.common.constant.ApiMessage;
import com.tasklion.backend.features.tasklionAccount.TasklionAccount;
import com.tasklion.backend.features.tasklionAccount.TasklionAccountRepo;
import com.tasklion.backend.features.tasklionAccount.constant.TasklionAccountStatus;
import com.tasklion.backend.features.tasklionAccount.role.Role;
import com.tasklion.backend.features.tasklionAccount.role.RoleRepo;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.management.relation.RoleNotFoundException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
@RequiredArgsConstructor
public class RoleBasedAuthenticationProvider implements AuthenticationProvider {

    private final TasklionAccountRepo tasklionAccountRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    @SneakyThrows
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String email = authentication.getName().trim().toLowerCase();
        String password = authentication.getCredentials().toString().trim();
        String currentRole = ((RoleBasedAuthenticationToken) authentication).getCurrentRole().toUpperCase().trim();
        TasklionAccount tasklionAccount = tasklionAccountRepo.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException(ApiMessage.INVALID_EMAIL_PASSWORD.getMessage()));

        validatePassword(password, tasklionAccount);
        validateRole(currentRole, tasklionAccount);
        validateAccountStatus(tasklionAccount);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new RoleBasedAuthenticationToken(email, password,
                getGrantedAuthorities(tasklionAccount.getAuthorities()), currentRole);
    }

    private void validatePassword(String rawPassword, TasklionAccount tasklionAccount) {
        if (!passwordEncoder.matches(rawPassword, tasklionAccount.getPassword())) {
            throw new BadCredentialsException(ApiMessage.INVALID_PASSWORD.getMessage());
        }
    }

    private void validateRole(String currentRole, TasklionAccount tasklionAccount) throws RoleNotFoundException {
        Role role = roleRepo.findByName(currentRole)
                .orElseThrow(() -> new RoleNotFoundException("Role not found: " + currentRole));
        boolean hasRole = tasklionAccount.getUserRoles().stream()
                .anyMatch(userRole -> userRole.getRole().equals(role));
        if (!hasRole) {
            throw new BadCredentialsException(ApiMessage.INVALID_EMAIL_PASSWORD.getMessage());
        }
    }

    private void validateAccountStatus(TasklionAccount tasklionAccount) {
        if (tasklionAccount.getStatus().equals(TasklionAccountStatus.BANNED.name())) {
            throw new BadCredentialsException(ApiMessage.ACCOUNT_DISABLED.getMessage());
        }
    }

    private List<GrantedAuthority> getGrantedAuthorities(Collection<? extends GrantedAuthority> authorities) {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (GrantedAuthority authority : authorities) {
            grantedAuthorities.add(new SimpleGrantedAuthority(authority.getAuthority()));
        }
        return grantedAuthorities;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (RoleBasedAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
