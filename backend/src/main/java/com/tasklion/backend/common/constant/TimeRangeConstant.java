package com.tasklion.backend.common.constant;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

public class TimeRangeConstant {
    public static final LocalTime MORNING_START = LocalTime.of(6, 0);
    public static final LocalTime MORNING_END = LocalTime.of(12, 0);
    public static final LocalTime AFTERNOON_START = LocalTime.of(12, 0);
    public static final LocalTime AFTERNOON_END = LocalTime.of(17, 0);
    public static final LocalTime EVENING_START = LocalTime.of(17, 0);
    public static final LocalTime EVENING_END = LocalTime.of(21, 0);

    public static Map<String, LocalTime[]> getTimeRanges() {
        Map<String, LocalTime[]> timeRanges = new HashMap<>();
        timeRanges.put("morning", new LocalTime[]{MORNING_START, MORNING_END});
        timeRanges.put("afternoon", new LocalTime[]{AFTERNOON_START, AFTERNOON_END});
        timeRanges.put("evening", new LocalTime[]{EVENING_START, EVENING_END});
        return timeRanges;
    }
}
