package com.tasklion.backend.model.api;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class SuccessResponseModel<T> extends BaseResponseModel<T> {

    // The data payload included in the API response, holding the actual content.
    private T data;

    @Builder.Default
    private String status = HttpStatus.OK.getReasonPhrase();

    @Builder.Default
    private Integer httpStatus = HttpStatus.OK.value();

    @Builder.Default
    private String message = "Success";

}

