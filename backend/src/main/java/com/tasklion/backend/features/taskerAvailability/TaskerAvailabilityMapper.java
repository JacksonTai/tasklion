package com.tasklion.backend.features.taskerAvailability;

import com.tasklion.backend.features.taskerAvailability.model.TaskerAvailabilityModel;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TaskerAvailabilityMapper {

    TaskerAvailabilityMapper INSTANCE = Mappers.getMapper(TaskerAvailabilityMapper.class);

    TaskerAvailabilityModel toModel(TaskerAvailability taskerAvailability);

    TaskerAvailability toEntity(TaskerAvailabilityModel taskerAvailabilityModel);

}
