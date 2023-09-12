package com.honeyprojects.core.teacher.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherSearchHistoryRequest extends PageableRequest {
    private String idStudent;
    private String status;
    private String idCategory;
    private String idTeacher;
}
