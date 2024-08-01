package com.tasklion.backend.features.tasklionUser.customer;

import com.tasklion.backend.features.personalDetail.PersonalDetailModel;
import com.tasklion.backend.features.tasklionAccount.model.TasklionAccountModel;
import com.tasklion.backend.features.tasklionUser.TasklionUserModel;
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
public class CustomerModel extends TasklionUserModel {

    private TasklionAccountModel tasklionAccount;
    private PersonalDetailModel personalDetail;

}
