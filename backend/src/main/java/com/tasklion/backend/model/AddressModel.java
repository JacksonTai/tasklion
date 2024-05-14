package com.tasklion.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class AddressModel {

    private Long id;
    private String addressLine;
    private String city;
    private String state;
    private String postcode;

}
