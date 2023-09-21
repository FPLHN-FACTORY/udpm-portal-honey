package com.honeyprojects.core.student.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StudentTransactionRequest {
    private String idCategory;
    private Integer type;
    private String idHoney;
    private Integer honeyPoint;
    private String idStudent;
    private String note;
}
