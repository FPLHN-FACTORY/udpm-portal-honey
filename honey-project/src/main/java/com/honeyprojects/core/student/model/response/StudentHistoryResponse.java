package com.honeyprojects.core.student.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentHistoryResponse {
    private Long changeDate;
    private String content;
    private String point;
    private String pointGet;
}
