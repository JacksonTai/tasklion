package com.tasklion.backend.features.tasklionAccount.model;

import com.tasklion.backend.features.personalDetail.PersonalDetailModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TasklionAccountDetailsModel {

    private TasklionAccountModel tasklionAccount;
    private PersonalDetailModel personalDetail;

}
