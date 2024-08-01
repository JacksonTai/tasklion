package com.tasklion.backend.features.task.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
public class TaskerTaskModel extends CommonTaskModel {

    private String customerUsername;
    private boolean isScheduleUnmet;
    private boolean isAcceptable;
    private boolean isCompletable;

}