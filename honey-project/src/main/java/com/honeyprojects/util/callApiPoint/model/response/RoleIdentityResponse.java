package com.honeyprojects.util.callApiPoint.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RoleIdentityResponse {

    private String roleName;
    private String roleCode;
    private boolean isDefault;
    private String id;
    private boolean isDeleted;
}
