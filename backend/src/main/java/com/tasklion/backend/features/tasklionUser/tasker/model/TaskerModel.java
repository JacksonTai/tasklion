package com.tasklion.backend.features.tasklionUser.tasker.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tasklion.backend.features.personalDetail.PersonalDetailModel;
import com.tasklion.backend.features.taskerService.model.TaskerServiceModel;
import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaModel;
import com.tasklion.backend.features.taskerService.serviceReview.model.RatingDetailModel;
import com.tasklion.backend.features.tasklionAccount.model.TasklionAccountModel;
import com.tasklion.backend.features.tasklionUser.TasklionUserModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class TaskerModel extends TasklionUserModel {

    private TasklionAccountModel tasklionAccount;
    private PersonalDetailModel personalDetail;

    private String aboutMe;
    private List<ServiceAreaModel> serviceAreas;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<TaskerServiceModel> services;
    private RatingDetailModel ratingDetail;

}
