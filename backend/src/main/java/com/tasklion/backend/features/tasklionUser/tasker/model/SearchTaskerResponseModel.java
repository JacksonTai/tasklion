package com.tasklion.backend.features.tasklionUser.tasker.model;


import com.tasklion.backend.features.taskerService.model.TaskerServiceModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class SearchTaskerResponseModel {

    private String username;
    private String fullName;
    private String aboutMe;
    private TaskerServiceModel taskerService;

}
