package com.tasklion.backend.mapper;

import com.tasklion.backend.domain.entity.Customer;
import com.tasklion.backend.domain.entity.Tasker;
import com.tasklion.backend.domain.entity.TasklionUser;
import com.tasklion.backend.model.CustomerModel;
import com.tasklion.backend.model.TaskerModel;
import com.tasklion.backend.model.TasklionUserModel;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TasklionUserMapper extends BaseUserMapper {

    TasklionUserMapper INSTANCE = Mappers.getMapper(TasklionUserMapper.class);

    @SubclassMapping(source = Customer.class, target = CustomerModel.class)
    @SubclassMapping(source = Tasker.class, target = TaskerModel.class)
    @Mapping(target = "userRoles", source = "userRoles", qualifiedByName = "mapUserRolesToStringRoles")
    TasklionUserModel toModel(TasklionUser tasklionUser);

    @AfterMapping
    default void afterToModel(final TasklionUser tasklionUser,
                              @MappingTarget final TasklionUserModel.TasklionUserModelBuilder tasklionUserModel) {
        tasklionUserModel.password(null);
    }

}
