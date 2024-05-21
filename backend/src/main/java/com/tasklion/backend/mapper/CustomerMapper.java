package com.tasklion.backend.mapper;

import com.tasklion.backend.domain.entity.Customer;
import com.tasklion.backend.model.CustomerModel;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CustomerMapper extends BaseUserMapper {

    CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);

    @Mapping(target = "userRoles", source = "userRoles", qualifiedByName = "mapUserRolesToStringRoles")
    CustomerModel toModel(Customer customer);

    @AfterMapping
    default void afterToModel(Customer customer, @MappingTarget final CustomerModel customerModel) {
        customerModel.setPassword(null);
    }

    @Mapping(target = "userRoles", source = "userRoles", qualifiedByName = "mapStringRolesToUserRoles")
    Customer toEntity(CustomerModel customerModel);

}
