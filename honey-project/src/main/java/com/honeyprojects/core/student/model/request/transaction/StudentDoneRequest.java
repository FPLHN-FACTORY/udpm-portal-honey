package com.honeyprojects.core.student.model.request.transaction;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StudentDoneRequest {
    private StudentChestSend ruongDen;
    private StudentChestSend ruongDi;
    private String idCategory;
}
