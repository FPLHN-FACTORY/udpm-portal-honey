package com.honeyprojects.core.student.model.response.transaction;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TransactionResponse {
    private String idTransaction;
    private String formUser;
    private String idUser;
}
