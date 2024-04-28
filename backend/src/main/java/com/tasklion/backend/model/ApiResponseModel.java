package com.tasklion.backend.model;

import com.tasklion.backend.constant.ApiConstant;
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
     * Creates an APIResponse for a successful operation.
     *
     * @param data            The data to include in the response.
     * @param responseHashMap A map containing response messages.
     * @param key             The key corresponding to the desired response message.
     * @param <T>             The type of data to be included in the response.
     * @return An APIResponse indicating a successful operation.
     */
    public static <T> ApiResponseModel<T> ok(T data, Map<String, String> responseHashMap, String key) {
        return ApiResponseModel.<T>builder()
                .httpStatus(HttpStatus.OK.value())
                .status(ApiConstant.RESULT_OK)
                .message(responseHashMap.get(key))
                .internalCode(key)
                .data(data)
                .build();
    }

    /**
     * Creates an APIResponse for a bad request operation.
     *
     * @param data            The data to include in the response.
     * @param responseHashMap A map containing response messages.
     * @param key             The key corresponding to the desired response message.
     * @param <T>             The type of data to be included in the response.
     * @return An APIResponse indicating a failed operation.
     */
    public static <T> ApiResponseModel<T> badRequest(T data, Map<String, String> responseHashMap, String key) {
        return ApiResponseModel.<T>builder()
                .httpStatus(HttpStatus.BAD_REQUEST.value())
                .status(ApiConstant.RESULT_BAD_REQUEST)
                .message(responseHashMap.get(key))
                .internalCode(key)
                .data(data)
                .build();
    }

    /**
     * Creates an APIResponse for a not found operation.
     *
     * @param data            The data to include in the response.
     * @param responseHashMap A map containing response messages.
     * @param key             The key corresponding to the desired response message.
     * @param <T>             The type of data to be included in the response.
     * @return An APIResponse indicating a failed operation.
     */
    public static <T> ApiResponseModel<T> notFound(T data, Map<String, String> responseHashMap, String key) {
        return ApiResponseModel.<T>builder()
                .httpStatus(HttpStatus.NOT_FOUND.value())
                .status(ApiConstant.RESULT_NOT_FOUND)
                .message(responseHashMap.get(key))
                .internalCode(key)
                .data(data)
                .build();
    }

    /**
     * Creates an APIResponse for a internal server error.
     *
     * @param data            The data to include in the response.
     * @param responseHashMap A map containing response messages.
     * @param key             The key corresponding to the desired response message.
     * @param <T>             The type of data to be included in the response.
     * @return An APIResponse indicating a failed operation.
     */
    public static <T> ApiResponseModel<T> internalServerError(T data, Map<String, String> responseHashMap, String key) {
        return ApiResponseModel.<T>builder()
                .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .status(ApiConstant.RESULT_INTERNAL_SERVER_ERROR)
                .message(responseHashMap.get(key))
                .internalCode(key)
                .data(data)
                .build();
    }
}