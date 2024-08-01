package com.tasklion.backend.features.taskerService;

import com.tasklion.backend.features.taskerService.model.TaskerServiceModel;
import com.tasklion.backend.features.taskerService.serviceReview.ServiceReviewMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        uses = ServiceReviewMapper.class)
public abstract class TaskerServiceMapper {

    public static TaskerServiceMapper INSTANCE = Mappers.getMapper(TaskerServiceMapper.class);

    @Mapping(target = "reviews", source = "reviews", qualifiedByName = "mapReviews")
    @Mapping(target = "ratingDetail", source = "reviews", qualifiedByName = "mapRatingDetail")
    public abstract TaskerServiceModel toModel(TaskerService taskerService);

    @Mapping(target = "reviews", ignore = true)
    public abstract TaskerService toEntity(TaskerServiceModel taskerServiceModel);

}
