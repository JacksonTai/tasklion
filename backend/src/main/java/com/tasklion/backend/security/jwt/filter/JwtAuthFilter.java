package com.tasklion.backend.security.jwt.filter;

import com.tasklion.backend.security.RoleBasedAuthenticationToken;
import com.tasklion.backend.security.jwt.service.JwtService;
import com.tasklion.backend.security.token.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final TokenService tokenService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String TOKE_PREFIX = "Bearer ";

        if (authHeader == null || !authHeader.startsWith(TOKE_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(TOKE_PREFIX.length());
        final String username = jwtService.extractUsername(jwt);
        final String currentRole = jwtService.extractCurrentRole(jwt);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            boolean isTokenValid = tokenService.isTokenValid(jwt);
            if (jwtService.isTokenValid(jwt, userDetails) && isTokenValid) {
                RoleBasedAuthenticationToken authToken = new RoleBasedAuthenticationToken(userDetails,
                        null, userDetails.getAuthorities(), currentRole);
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
            if (!isTokenValid) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: Invalid or revoked token");
                response.getWriter().flush();
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

}
