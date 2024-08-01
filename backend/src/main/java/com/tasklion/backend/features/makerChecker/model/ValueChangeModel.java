package com.tasklion.backend.features.makerChecker.model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ValueChangeModel {

    private String field;
    private String currentValue;
    private String newValue;

}
