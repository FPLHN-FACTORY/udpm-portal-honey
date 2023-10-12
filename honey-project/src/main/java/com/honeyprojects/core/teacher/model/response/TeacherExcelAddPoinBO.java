package com.honeyprojects.core.teacher.model.response;

import lombok.Data;

import java.util.List;

@Data
public class TeacherExcelAddPoinBO {
    private Long total;
    private Long totalSuccess;
    private Long totalError;
    private List<TeacherAddPoinExcelResponse> responseList;
}
