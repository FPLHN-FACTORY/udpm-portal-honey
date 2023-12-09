package com.honeyprojects.core.student.model.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StudentHallOfFameBO {
    private Integer stt;
    private String id;
    private String name;
    private String username;
    private Integer rank;
    private List<StudentCategoryDTO> lstCategories;
    private Integer numberTotalHoney;
    private String picture;
}
