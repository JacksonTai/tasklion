package com.tasklion.backend.model.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class BaseResponseModel<T> {

    // The status of the API response, indicating success or failure.
    protected String status;

    // The HTTP status code associated with the API response.
    protected Integer httpStatus;

    // A human-readable message providing additional information about the API response.
    protected String message;

}