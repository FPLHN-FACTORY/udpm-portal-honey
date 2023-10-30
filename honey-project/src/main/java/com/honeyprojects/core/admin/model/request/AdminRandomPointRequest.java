package com.honeyprojects.core.admin.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminRandomPointRequest {
    private Integer minPoint;
    private Integer maxPoint;
//    private Integer numberStudent;
//    private Integer Type;
    private String chestId;
    private List<String> listCategoryPoint;
    private List<String> listStudentPoint;
    private List<String> listItem;
}
