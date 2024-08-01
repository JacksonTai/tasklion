package com.tasklion.backend.features.startup.state;

import com.tasklion.backend.common.constant.ApiEndpoint;
import com.tasklion.backend.common.model.api.SuccessResponseModel;
import com.tasklion.backend.features.startup.state.service.StateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}" + ApiEndpoint.STATE)
public class StateController {

    private final StateService stateService;

    @GetMapping
    public ResponseEntity<SuccessResponseModel<List<State>>> getAllState() {
        log.info("GET [{}] - getAllState()", ApiEndpoint.STATE);
        return ResponseEntity.ok(SuccessResponseModel.<List<State>>builder()
                .data(stateService.findAllState())
                .build());
    }

}
