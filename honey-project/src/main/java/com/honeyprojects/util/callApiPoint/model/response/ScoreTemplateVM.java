package com.honeyprojects.util.callApiPoint.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScoreTemplateVM {

    private String classStudentId;
    private String scoreElementId;
    private Long score;
    private Long scoreType;
    private Long minScore;
    private Long maxScore;
    private Long scoreRatio;
    private String createdDate;
    private String name;
    private Long index;
    private String group;
    private Long status;
    private String scoreElementName;
}
