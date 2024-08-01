package com.tasklion.backend.features.taskerService.serviceArea;

import com.tasklion.backend.features.taskerService.serviceArea.model.ServiceAreaModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ServiceAreaMapper {

    ServiceAreaMapper INSTANCE = Mappers.getMapper(ServiceAreaMapper.class);

    @Mapping(target = "tasker.tasklionAccount.userRoles", ignore = true)
    @Mapping(target = "tasker.services", ignore = true)
    @Mapping(target = "tasker.serviceAreas", ignore = true)
    ServiceAreaModel toModel(ServiceArea serviceArea);

    @Mapping(target = "tasker.tasklionAccount.userRoles", ignore = true)
    @Mapping(target = "tasker.services", ignore = true)
    @Mapping(target = "tasker.serviceAreas", ignore = true)
    ServiceArea toEntity(ServiceAreaModel serviceAreaModel);
}