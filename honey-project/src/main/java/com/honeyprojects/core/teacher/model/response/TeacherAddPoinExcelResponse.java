package com.honeyprojects.core.teacher.model.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TeacherAddPoinExcelResponse {
    public String studentName;

    public String email;

    public Integer honeyPoint;

    private String honeyId;

    private String note;

    private String categoryName;
}
