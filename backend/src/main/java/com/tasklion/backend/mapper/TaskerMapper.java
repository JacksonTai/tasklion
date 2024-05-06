package com.tasklion.backend.mapper;

import com.tasklion.backend.domain.entity.Tasker;
import com.tasklion.backend.model.TaskerModel;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TaskerMapper {

    TaskerModel toModel(Tasker tasker);

    Tasker toEntity(TaskerModel taskerModel);

}
