package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AdminAddPointStudentLabReportBOO extends PageableRequest {
    private String code;
    private List<AdminAddPointStudentLabReportRequestt> listStudent;
    private String categoryId;
    private Long total;
    private Long totalSuccess;
    private Long totalError;
}
