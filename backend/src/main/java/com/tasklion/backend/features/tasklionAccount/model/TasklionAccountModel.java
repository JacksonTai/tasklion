package com.tasklion.backend.features.tasklionAccount.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class TasklionAccountModel {

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String id;
    private String username;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String status;
    private Set<String> userRoles = new HashSet<>();

}
