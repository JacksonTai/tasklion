package com.tasklion.backend.common.model.api;

import com.tasklion.backend.common.constant.ApiMessage;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ErrorResponseModel<T> extends BaseResponseModel<T> {

    @Builder.Default
    private String status = HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase();

    @Builder.Default
    private Integer httpStatus = HttpStatus.INTERNAL_SERVER_ERROR.value();

    @Builder.Default
    private String message = HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase();

    @Builder.Default
    private String internalCode = ApiMessage.INTERNAL_SERVER_ERROR.getKey();

}
