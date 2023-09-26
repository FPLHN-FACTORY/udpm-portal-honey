package com.honeyprojects.core.student.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentFilterHistoryRequest extends PageableRequest {

    private String status;

    private String idCategory;
}
