package com.tasklion.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "security")
public class SecurityPropertyConfig {

    private Jwt jwt;

    @Data
    public static class Jwt {
        private String secret;
        private String header;
        private long expirationInMs;
    }
}