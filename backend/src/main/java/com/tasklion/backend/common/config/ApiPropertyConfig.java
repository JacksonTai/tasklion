package com.tasklion.backend.common.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "api")
public class ApiPropertyConfig {

    private String version;
    private String baseUrl;

    public String getBasePath() {
        return baseUrl + (version != null ? "/" + version : "");
    }

}
