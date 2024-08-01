package com.tasklion.backend.features.task;


import com.tasklion.backend.features.task.model.CustomerTaskModel;
import com.tasklion.backend.features.task.model.TaskModel;
import com.tasklion.backend.features.task.model.TaskerTaskModel;
import com.tasklion.backend.features.taskerService.serviceReview.ServiceReviewMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        uses = ServiceReviewMapper.class)
public interface TaskMapper {

    @Mapping(target = "customer.tasklionAccount.userRoles", ignore = true)
    @Mapping(target = "taskerService.ratingDetail", source = "taskerService.reviews", qualifiedByName = "mapRatingDetail")
    @Mapping(target = "serviceArea.tasker", ignore = true)
    TaskModel toModel(Task task);

    @Mapping(target = "taskerServiceId", source = "taskerService.id")
    @Mapping(target = "taskerUsername", source = "taskerService.tasker.tasklionAccount.username")
    @Mapping(target = "serviceCategory", source = "taskerService.category.name")
    @Mapping(target = "serviceArea.tasker", ignore = true)
    CustomerTaskModel toCustomerTaskModel(Task task);

    @Mapping(target = "taskerServiceId", source = "taskerService.id")
    @Mapping(target = "customerUsername", source = "customer.tasklionAccount.username")
    @Mapping(target = "serviceCategory", source = "taskerService.category.name")
    @Mapping(target = "serviceArea.tasker", ignore = true)
    TaskerTaskModel toTaskerTaskModel(Task task);

}
