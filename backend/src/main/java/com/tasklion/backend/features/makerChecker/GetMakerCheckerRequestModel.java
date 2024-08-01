package com.tasklion.backend.features.makerChecker;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class GetMakerCheckerRequestModel {

    private Long id;
    private String status;
    private String makerId;
    private String checkerId;

}
