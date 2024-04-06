package com.tasklion.backend.security;

import com.tasklion.backend.domain.entity.TasklionUser;
import com.tasklion.backend.domain.repository.TasklionUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
@RequiredArgsConstructor
public class UserDetailsAuthenticationProvider implements AuthenticationProvider {

    private final TasklionUserRepo tasklionUserRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String email = authentication.getName();
        String password = authentication.getCredentials().toString();
        TasklionUser tasklionUser = tasklionUserRepo.findByEmail(email).orElse(null);

        if (tasklionUser != null) {
            if (passwordEncoder.matches(password, tasklionUser.getPassword())) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
                return new UsernamePasswordAuthenticationToken(email, password,
                        getGrantedAuthorities(tasklionUser.getAuthorities()));
            } else {
                throw new BadCredentialsException("Invalid password!");
            }
        } else {
            throw new BadCredentialsException("No user registered with this details!");
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
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
