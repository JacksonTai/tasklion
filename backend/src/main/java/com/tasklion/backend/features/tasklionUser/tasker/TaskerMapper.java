package com.tasklion.backend.features.tasklionUser.tasker;

import com.tasklion.backend.features.taskerService.serviceArea.ServiceArea;
import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaModel;
import com.tasklion.backend.features.tasklionAccount.userRole.UserRoleMapper;
import com.tasklion.backend.features.tasklionUser.tasker.model.TaskerModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {UserRoleMapper.class})
public abstract class TaskerMapper {

    @Mapping(target = "tasklionAccount.userRoles", source = "tasklionAccount.userRoles",
            qualifiedByName = "mapUserRolesToStringRoles")
    @Mapping(target = "services", ignore = true)
    public abstract TaskerModel toModel(Tasker tasker);

    @Mapping(target = "tasklionAccount.userRoles", source = "tasklionAccount.userRoles",
            qualifiedByName = "mapStringRolesToUserRoles")
    @Mapping(target = "services", ignore = true)
    public abstract Tasker toEntity(TaskerModel taskerModel);

    @Mapping(target = "tasker", ignore = true)
    protected abstract ServiceAreaModel serviceAreaToServiceAreaModel(ServiceArea serviceArea);

}
