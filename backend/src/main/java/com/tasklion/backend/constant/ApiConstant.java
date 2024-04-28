package com.tasklion.backend.constant;

import java.util.Map;

public class ApiConstant {

    public static final String RESULT_OK = "OK";
    public static final String RESULT_NOT_FOUND = "NOT_FOUND";
    public static final String RESULT_BAD_REQUEST = "BAD_REQUEST";
    public static final String RESULT_INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR";

    public static final String LOG_RESPONSE_CODE_PREFIX = "LOG-";

    public static Map<String, String> getLogResponseHashMap() {
        return Map.of(
                LOG_RESPONSE_CODE_PREFIX + "1", "Log not found",
                LOG_RESPONSE_CODE_PREFIX + "2", "Log already exists",
                LOG_RESPONSE_CODE_PREFIX + "3", "Log not created",
                LOG_RESPONSE_CODE_PREFIX + "4", "Log not updated",
                LOG_RESPONSE_CODE_PREFIX + "5", "Log not deleted",
                LOG_RESPONSE_CODE_PREFIX + "6", "Log found",
                LOG_RESPONSE_CODE_PREFIX + "7", "Log created",
                LOG_RESPONSE_CODE_PREFIX + "8", "Log updated",
                LOG_RESPONSE_CODE_PREFIX + "9", "Log deleted",
                LOG_RESPONSE_CODE_PREFIX + "10", "Log list found"
        );
    }
}
