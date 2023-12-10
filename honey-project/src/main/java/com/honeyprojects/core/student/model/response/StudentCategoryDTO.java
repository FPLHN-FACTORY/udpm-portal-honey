package com.honeyprojects.core.student.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentCategoryDTO {
    private Integer numberHoney;
    private String nameCategory;

    public StudentCategoryDTO(Integer numberHoney, String nameCategory) {
        this.numberHoney = numberHoney;
        this.nameCategory = nameCategory;
    }
}
