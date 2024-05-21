package com.tasklion.backend.mapper;

import com.tasklion.backend.domain.entity.Tasker;
import com.tasklion.backend.model.TaskerModel;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TaskerMapper extends BaseUserMapper {

    TaskerMapper INSTANCE = Mappers.getMapper(TaskerMapper.class);

    @Mapping(target = "userRoles", source = "userRoles", qualifiedByName = "mapUserRolesToStringRoles")
    TaskerModel toModel(Tasker tasker);

    @AfterMapping
    default void afterToModel(Tasker tasker, @MappingTarget TaskerModel.TaskerModelBuilder taskerModel) {
        taskerModel.password(null);
    }

    @Mapping(target = "userRoles", source = "userRoles", qualifiedByName = "mapStringRolesToUserRoles")
    Tasker toEntity(TaskerModel taskerModel);

}
