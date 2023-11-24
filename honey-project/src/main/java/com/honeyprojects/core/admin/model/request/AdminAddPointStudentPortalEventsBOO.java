package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AdminAddPointStudentPortalEventsBOO extends PageableRequest {
    private String code;
    private List<String> lstStudentId;
    private String categoryId;
    private Integer numberHoney;
}
