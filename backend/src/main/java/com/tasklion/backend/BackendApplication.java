package com.tasklion.backend;

import com.tasklion.backend.config.ApiPropertyConfig;
import com.tasklion.backend.config.SecurityPropertyConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({SecurityPropertyConfig.class, ApiPropertyConfig.class})
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
