package com.tasklion.backend.features.taskerService.serviceCategory;

import com.tasklion.backend.features.taskerService.serviceCategory.model.ServiceCategoryModel;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ServiceCategoryMapper {

    ServiceCategoryMapper INSTANCE = Mappers.getMapper(ServiceCategoryMapper.class);

    ServiceCategoryModel toModel(ServiceCategory serviceCategory);

    ServiceCategory toEntity(ServiceCategoryModel serviceCategoryModel);

}
