package com.tasklion.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class PersonalDetailModel {

    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String profilePictureUrl;
    private AddressModel address;

}
