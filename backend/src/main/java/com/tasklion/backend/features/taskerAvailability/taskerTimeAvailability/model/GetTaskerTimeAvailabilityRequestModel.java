package com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.model;

import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.QTaskerTimeAvailability;
import com.tasklion.backend.features.tasklionUser.tasker.Tasker;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetTaskerTimeAvailabilityRequestModel {

    private QTaskerTimeAvailability qTaskerTimeAvailability;
    private Tasker tasker;
    private List<String> timeOfDay;
    private LocalTime specificTime;
    private int duration;

}
