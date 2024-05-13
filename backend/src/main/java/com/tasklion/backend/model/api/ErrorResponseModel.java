package com.tasklion.backend.model.api;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ErrorResponseModel<T> extends BaseResponseModel<T> {

    // An internal code or identifier for the API response, aiding in error identification.
    private String internalCode;

    // The error payload included in the API response, holding error details.
    private Map<String, List<String>> error;

    @Builder.Default
    private String status = HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase();

    @Builder.Default
    private Integer httpStatus = HttpStatus.INTERNAL_SERVER_ERROR.value();

    @Builder.Default
    private String message = HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase();

}
