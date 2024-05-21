package com.tasklion.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class PersonalDetailModel {

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long id;
    private String fullName;
    private String phoneNumber;
    private String dateOfBirth;
    private String profilePictureUrl;

}
