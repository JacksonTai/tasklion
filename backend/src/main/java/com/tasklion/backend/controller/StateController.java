package com.tasklion.backend.controller;

import com.tasklion.backend.domain.entity.State;
import com.tasklion.backend.model.api.SuccessResponseModel;
import com.tasklion.backend.service.StateService;
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
@RequestMapping("${api.base-url}/${api.version}/state")
public class StateController {

    private final StateService stateService;

    @GetMapping
    public ResponseEntity<SuccessResponseModel<List<State>>> getAllState() {
        log.info("[/state]");
        return ResponseEntity.ok(SuccessResponseModel.<List<State>>builder()
                .data(stateService.findAllState())
                .build());
    }

}
