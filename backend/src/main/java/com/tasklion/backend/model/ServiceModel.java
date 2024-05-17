package com.tasklion.backend.model;

import com.tasklion.backend.domain.entity.Tasker;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceModel {

    private String id;
    private Tasker tasker;
    private String title;
    private String description;

}
