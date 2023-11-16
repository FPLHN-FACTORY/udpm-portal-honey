package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminAddPointStudentRequest extends PageableRequest {

    private String id;

    private String email;

    private Double pointStudent;
}
