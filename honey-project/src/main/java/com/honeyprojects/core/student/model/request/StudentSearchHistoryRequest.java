package com.honeyprojects.core.student.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentSearchHistoryRequest extends PageableRequest {

    private Long fromDate;
    private Long toDate;
    private String idUserLogin;
}
