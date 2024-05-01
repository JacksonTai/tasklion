package com.tasklion.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "security")
public class SecurityPropertyConfig {

    private Jwt jwt;

    @Data
    public static class Jwt {
        private String issuer;
        private String subject;
        private String secret;
        private long expirationInMs;
        private RefreshToken refreshToken;
    }

    @Data
    public static class RefreshToken {
        private String subject;
        private long expirationInMs;
    }
}