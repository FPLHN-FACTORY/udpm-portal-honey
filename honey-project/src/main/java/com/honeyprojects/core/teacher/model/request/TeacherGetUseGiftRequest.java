package com.honeyprojects.core.teacher.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherGetUseGiftRequest extends PageableRequest {
    private String email;
    private String gift;
    private String lop;
    private String status;
    private String idTeacher;
    private String idStudent;
}
