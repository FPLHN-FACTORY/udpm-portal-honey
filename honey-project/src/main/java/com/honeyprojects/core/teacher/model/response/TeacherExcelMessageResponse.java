package com.honeyprojects.core.teacher.model.response;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class TeacherExcelMessageResponse {
    private Boolean status;

    private String message;
}
