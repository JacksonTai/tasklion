package com.tasklion.backend.mapper;

import com.tasklion.backend.domain.entity.Customer;
import com.tasklion.backend.model.CustomerModel;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CustomerMapper {

    CustomerModel toModel(Customer customer);

    Customer toEntity(CustomerModel customerModel);

}
