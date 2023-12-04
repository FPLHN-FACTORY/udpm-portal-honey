package com.honeyprojects.util.callApiPoint.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FilterScoreTemplate {

    private String classId;
    private String subjectId;
    private Long scoreRatio;
    private Double score;
    private Long scoreRatioMin;
    private Long scoreRatioMax;
}
