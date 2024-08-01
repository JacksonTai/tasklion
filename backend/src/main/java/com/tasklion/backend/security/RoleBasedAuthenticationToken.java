package com.tasklion.backend.security;

import lombok.Getter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
public class RoleBasedAuthenticationToken extends UsernamePasswordAuthenticationToken {

    private final String currentRole;

    public RoleBasedAuthenticationToken(Object principal, Object credentials, String currentRole) {
        super(principal, credentials);
        this.currentRole = currentRole;
    }

    public RoleBasedAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities, String currentRole) {
        super(principal, credentials, authorities);
        this.currentRole = currentRole;
    }

}
