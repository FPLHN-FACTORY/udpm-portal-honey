package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AdminAddPointStudentPortalEventsBO extends PageableRequest {
    private String code;
    private List<AdminAddPointStudentPortalEventsRequest> lstStudentId;
    private String categoryId;
    private Integer numberHoney;
    private Long total;
    private Long totalSuccess;
    private Long totalError;
}
