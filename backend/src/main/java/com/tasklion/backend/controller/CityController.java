package com.tasklion.backend.controller;

import com.tasklion.backend.model.api.SuccessResponseModel;
import com.tasklion.backend.service.CityService;
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
@RequestMapping("${api.base-url}/${api.version}/city")
public class CityController {

    private final CityService cityService;

    @GetMapping("/by-state")
    public SuccessResponseModel<Map<String, List<String>>> getCitiesByState() {
        log.info("[/city/by-state]");
        return SuccessResponseModel.<Map<String, List<String>>>builder()
                .data(cityService.getCitiesByState())
                .build();
    }
}
