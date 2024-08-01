package com.tasklion.backend.features.personalDetail;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tasklion.backend.features.tasklionAccount.model.TasklionAccountModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class PersonalDetailModel {

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long id;
    private String fullName;
    private String phoneNumber;
    private String dateOfBirth;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private TasklionAccountModel tasklionAccount;

}
