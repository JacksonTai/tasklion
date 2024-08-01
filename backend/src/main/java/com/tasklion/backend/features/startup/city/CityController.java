package com.tasklion.backend.features.startup.city;

import com.tasklion.backend.common.constant.ApiEndpoint;
import com.tasklion.backend.common.model.api.SuccessResponseModel;
import com.tasklion.backend.features.startup.city.service.CityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}" + ApiEndpoint.CITY)
public class CityController {

    private final CityService cityService;

    @GetMapping(ApiEndpoint.BY_STATE)
    public SuccessResponseModel<Map<String, List<String>>> getCitiesByState() {
        log.info("GET [{}] - getCitiesByState()", ApiEndpoint.BY_STATE);
        return SuccessResponseModel.<Map<String, List<String>>>builder()
                .data(cityService.getCitiesByState())
                .build();
    }
}
