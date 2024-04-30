package com.tasklion.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "api")
public class ApiConfig {

    private String version;
    private String baseUrl;

    public String getBasePath() {
        return baseUrl + (version != null ? "/" + version : "");
    }

}
