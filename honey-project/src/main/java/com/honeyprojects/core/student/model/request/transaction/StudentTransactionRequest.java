package com.honeyprojects.core.student.model.request.transaction;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StudentTransactionRequest {
    private String nameUser;
    private String idTransaction;
    private String idUser;
}
