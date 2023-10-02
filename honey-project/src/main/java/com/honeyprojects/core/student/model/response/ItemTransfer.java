package com.honeyprojects.core.student.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemTransfer {
    private String idUser;
    private String itemTransfer;
    private int amount;
}
