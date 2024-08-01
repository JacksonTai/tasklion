package com.tasklion.backend.features.task.model;

import com.tasklion.backend.common.model.PaginationModel;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class TaskRequestModel {
    private PaginationModel paginationModel;
    private List<String> status;
    private String username;
    private String userRole;
    private LocalDate date;
}