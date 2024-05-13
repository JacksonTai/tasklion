package com.tasklion.backend.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class TaskerModel extends TasklionUserModel {

    private PersonalDetailModel personalDetail;
    @NotBlank
    private String aboutMe;
    private String[] skills;
}
