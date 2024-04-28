package com.tasklion.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponseModel<T> {

    // The status of the API response, indicating success or failure.
    private String status;

    // The HTTP status code associated with the API response.
    private Integer httpStatus;

    // A human-readable message providing additional information about the API response.
    private String message;

    // An internal code or identifier for the API response, aiding in error identification.
    private String internalCode;

    // The data payload included in the API response, holding the actual content.
    private T data;

    /**
     * Creates an ApiResponse based on HTTP status code and retrieves message from response map.
     *
     * @param data The data to include in the response (can be null).
     * @param responseHashMap A map containing response messages.
     * @param key The key corresponding to the desired response message.
     * @param httpStatus The HTTP status code for the response.
     * @param <T> The type of data to be included in the response.
     * @return An ApiResponseModel representing the response.
     * @throws IllegalArgumentException if key is not found in responseHashMap.
     */
    public static <T> ApiResponseModel<T> create(T data, Map<String, String> responseHashMap, String key,
                                                 HttpStatus httpStatus) {
        String message = responseHashMap.get(key);
        if (message == null) {
            throw new IllegalArgumentException("Message key not found in response map: " + key);
        }
        return ApiResponseModel.<T>builder()
                .httpStatus(httpStatus.value())
                .status(httpStatus.getReasonPhrase())
                .message(message)
                .internalCode(key)
                .data(data)
                .build();
    }
}