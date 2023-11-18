package com.honeyprojects.util.callApiPoint.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
// lớp học
public class ClassSubjectDto {

    private String id;
    private String lecturerId;
    private String transferLecturerId;
    private String blockSemesterId;
    private String subjectId;
    private String name;
    private Long numberOfStudents;
    private String createdDate;
    private String note;
    private Long status;
    private String lecturerCode;
    private String lecturerName;
    private String lecturerMail;
    private String blockName;
    private String semesterName;
    private String startDate;
    private String endDate;
    private String subjectCode;
    private String subjectName;
    private String majorId;
    private String majorCode;
    private String majorName;
    private Long numberOfStudentsCurrent;
    private Long numberOfStudentsFailed;
    private Long numberOfStudentsPassed;
}
