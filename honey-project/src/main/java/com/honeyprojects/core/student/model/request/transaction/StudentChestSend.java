package com.honeyprojects.core.student.model.request.transaction;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StudentChestSend {
    private String idUser;
    private Integer honey;
    private List<ItemTransfer> item;
}
