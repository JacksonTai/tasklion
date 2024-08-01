package com.tasklion.backend.features.personalDetail;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PersonalDetailMapper {

    PersonalDetailMapper INSTANCE = Mappers.getMapper(PersonalDetailMapper.class);

    @Mapping(target = "tasklionAccount.userRoles", ignore = true)
    PersonalDetail toEntity(PersonalDetailModel personalDetailModel);

    @Mapping(target = "tasklionAccount.userRoles", ignore = true)
    PersonalDetailModel toModel(PersonalDetail personalDetail);

}
