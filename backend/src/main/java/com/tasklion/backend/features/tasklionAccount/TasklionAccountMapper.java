package com.tasklion.backend.features.tasklionAccount;

import com.tasklion.backend.features.personalDetail.PersonalDetail;
import com.tasklion.backend.features.personalDetail.PersonalDetailModel;
import com.tasklion.backend.features.tasklionAccount.model.TasklionAccountModel;
import com.tasklion.backend.features.tasklionAccount.userRole.UserRoleMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {UserRoleMapper.class})
public abstract class TasklionAccountMapper {

    @Mapping(target = "userRoles", source = "userRoles", qualifiedByName = "mapUserRolesToStringRoles")
    public abstract TasklionAccountModel toModel(TasklionAccount tasklionUser);

    @Mapping(target = "userRoles", source = "userRoles", qualifiedByName = "mapStringRolesToUserRoles")
    public abstract TasklionAccount toEntity(TasklionAccountModel tasklionUserModel);

    @Mapping(target = "tasklionAccount", ignore = true)
    protected abstract PersonalDetailModel personalDetailToPersonalDetailModel(PersonalDetail personalDetail);

}
