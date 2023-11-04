package com.honeyprojects.core.student.model.param;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StudentSumHistoryParam {
    private String giftId;
    private String className;
    private String subject;
    private Long formSemester;
    private Long toSemester;
}
