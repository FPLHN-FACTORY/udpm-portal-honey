package com.honeyprojects.util.callApiPoint.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassSubjectVM {

    private String className;
    private String classId;
    private String subjectName;
    private String subjectId;
    private String teacherEmail;
}
