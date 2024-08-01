package com.tasklion.backend.security.config;

import com.tasklion.backend.common.config.ApiPropertyConfig;
import com.tasklion.backend.common.constant.ApiEndpoint;
import com.tasklion.backend.common.constant.TasklionUserRole;
import com.tasklion.backend.common.filter.FilterChainExceptionHandler;
import com.tasklion.backend.security.BearerTokenAuthenticationEntryPoint;
import com.tasklion.backend.security.filter.CsrfCookieFilter;
import com.tasklion.backend.security.jwt.filter.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final BearerTokenAuthenticationEntryPoint bearerTokenAuthenticationEntryPoint;
    private final JwtAuthFilter jwtAuthFilter;
    private final ApiPropertyConfig apiPropertyConfig;
    private final FilterChainExceptionHandler filterChainExceptionHandler;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        String apiBaseUrl = apiPropertyConfig.getBasePath();
        return httpSecurity
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(corsCustomizer -> corsCustomizer.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
                    config.setAllowedMethods(Collections.singletonList("*"));
                    config.setAllowCredentials(true);
                    config.setAllowedHeaders(Collections.singletonList("*"));
                    config.setExposedHeaders(List.of(HttpHeaders.AUTHORIZATION, "_csrf"));
                    config.setMaxAge(3600L);
                    return config;
                }))
                .csrf(AbstractHttpConfigurer::disable)
//                .csrf(csrf -> csrf.csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler())
//                        .ignoringRequestMatchers(
//                                request -> request.getServletPath().startsWith(apiBaseUrl + ApiEndpoint.AUTH + ApiEndpoint.LOGIN),
//                                request -> request.getServletPath().startsWith(apiBaseUrl + ApiEndpoint.AUTH + ApiEndpoint.REFRESH_TOKEN),
//                                request -> request.getServletPath().startsWith(apiBaseUrl + ApiEndpoint.USER + ApiEndpoint.IS_EXISTS),
//                                request -> request.getServletPath().startsWith(apiBaseUrl + ApiEndpoint.CUSTOMER + ApiEndpoint.REGISTER),
//                                request -> request.getServletPath().startsWith(apiBaseUrl + ApiEndpoint.TASKER + ApiEndpoint.REGISTER)
//                        )
//                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                )
                .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(filterChainExceptionHandler, LogoutFilter.class)
                .authorizeHttpRequests(request -> request
                        .requestMatchers(
                                apiBaseUrl + ApiEndpoint.AUTH + ApiEndpoint.LOGIN,
                                apiBaseUrl + ApiEndpoint.AUTH + ApiEndpoint.REFRESH_TOKEN,
                                apiBaseUrl + ApiEndpoint.AUTH + ApiEndpoint.VERIFY_TOKEN,
                                apiBaseUrl + ApiEndpoint.TASKLION_ACCOUNT + ApiEndpoint.IS_EXISTS,
                                apiBaseUrl + ApiEndpoint.CUSTOMER + ApiEndpoint.REGISTER,
                                apiBaseUrl + ApiEndpoint.TASKER + ApiEndpoint.REGISTER,
                                apiBaseUrl + ApiEndpoint.CITY + ApiEndpoint.BY_STATE,
                                apiBaseUrl + ApiEndpoint.STATE
                        ).permitAll()

                        .requestMatchers(
                                apiBaseUrl + ApiEndpoint.TASKER,
                                apiBaseUrl + ApiEndpoint.TASKER + ApiEndpoint.COUNT,
                                apiBaseUrl + ApiEndpoint.CUSTOMER,
                                apiBaseUrl + ApiEndpoint.CUSTOMER + ApiEndpoint.COUNT,
                                apiBaseUrl + ApiEndpoint.TASKS + ApiEndpoint.COUNT + ApiEndpoint.BY_STATUS,
                                apiBaseUrl + ApiEndpoint.SERVICES + ApiEndpoint.MOST_OFFERED,
                                apiBaseUrl + ApiEndpoint.TASKLION_ACCOUNT + "/{username}" + ApiEndpoint.STATUS
                        ).hasRole(TasklionUserRole.ADMIN.name())

                        .requestMatchers(
                                apiBaseUrl + ApiEndpoint.AUTH + ApiEndpoint.SWITCH_ROLE,
                                apiBaseUrl + ApiEndpoint.AUTH + ApiEndpoint.LOGOUT,
                                apiBaseUrl + ApiEndpoint.CUSTOMER + "/{username}",
                                apiBaseUrl + ApiEndpoint.TASKER + "/{username}",
                                apiBaseUrl + ApiEndpoint.TASKER + "/{username}"+ ApiEndpoint.SERVICES,
                                apiBaseUrl + ApiEndpoint.TASKER + "/{username}"+ ApiEndpoint.SERVICES + "/{id}",
                                apiBaseUrl + ApiEndpoint.TASKER + "/{username}"+ ApiEndpoint.TASKS,
                                apiBaseUrl + ApiEndpoint.TASKER + "/{username}"+ ApiEndpoint.AVAILABILITY,
                                apiBaseUrl + ApiEndpoint.TASKER + "/{username}" + ApiEndpoint.SERVICE_AREA + ApiEndpoint.OPTIONS,
                                apiBaseUrl + ApiEndpoint.SERVICE_AREA,
                                apiBaseUrl + ApiEndpoint.SERVICE_REVIEW,
                                apiBaseUrl + ApiEndpoint.SERVICE_REVIEW + "/**",
                                apiBaseUrl + ApiEndpoint.SERVICE_CATEGORIES,
                                apiBaseUrl + ApiEndpoint.SERVICE_CATEGORIES + "/**",
                                apiBaseUrl + ApiEndpoint.SERVICES + "/**",
                                apiBaseUrl + ApiEndpoint.TASKS + "/{taskId}",
                                apiBaseUrl + ApiEndpoint.TASKS + "/{taskId}" + "/**"
                        ).authenticated()

                        .requestMatchers(
                                apiBaseUrl + ApiEndpoint.TASKLION_ACCOUNT + "/**",
                                apiBaseUrl + ApiEndpoint.CUSTOMER + "/{username}" + ApiEndpoint.TASKS,
                                apiBaseUrl + ApiEndpoint.TASKER + ApiEndpoint.SETUP
                        ).hasRole(TasklionUserRole.CUSTOMER.name())

                        .requestMatchers(
                                apiBaseUrl + ApiEndpoint.SERVICE_AREA + "/**",
                                apiBaseUrl + ApiEndpoint.TASKLION_ACCOUNT + "/**",
                                apiBaseUrl + ApiEndpoint.TASKER + "/{username}"+ ApiEndpoint.SERVICE_AREA,
                                apiBaseUrl + ApiEndpoint.TASKER + ApiEndpoint.AVAILABILITY + "/**",
                                apiBaseUrl + ApiEndpoint.TASKER + "/{username}"+ ApiEndpoint.AVAILABILITY + ApiEndpoint.BY_DAY
                        ).hasRole(TasklionUserRole.TASKER.name())

                )
                .exceptionHandling((exceptions) -> exceptions
                        .authenticationEntryPoint(bearerTokenAuthenticationEntryPoint)
                )
                .formLogin(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults())
                .logout(logout -> logout
                        .logoutUrl(apiBaseUrl + ApiEndpoint.AUTH + ApiEndpoint.LOGOUT)
                        .addLogoutHandler(logoutHandler)
                        .logoutSuccessHandler((request, response, authentication) -> {
                            SecurityContextHolder.clearContext();
                            response.setStatus(200);
                        })
                )
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
