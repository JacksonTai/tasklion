package com.tasklion.backend.features.tasklionUser.customer;

import com.tasklion.backend.features.tasklionAccount.userRole.UserRoleMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {UserRoleMapper.class})
public abstract class CustomerMapper {

    @Mapping(target = "tasklionAccount.userRoles", source = "tasklionAccount.userRoles",
            qualifiedByName = "mapUserRolesToStringRoles")
    public abstract CustomerModel toModel(Customer customer);

    @Mapping(target = "tasklionAccount.userRoles", source = "tasklionAccount.userRoles",
            qualifiedByName = "mapStringRolesToUserRoles")
    public abstract Customer toEntity(CustomerModel customerModel);


}
