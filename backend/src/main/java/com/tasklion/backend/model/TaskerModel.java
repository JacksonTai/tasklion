package com.tasklion.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class TaskerModel extends TasklionUserModel {

    private PersonalDetailModel personalDetail;
    private String aboutMe;
    private AddressModel address;
    private List<ServiceModel> services;

}
