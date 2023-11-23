package com.honeyprojects.util.callApiPoint.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ScoreTemplate {

    private String id;
    private String subjectId;
    private String name;
    private Long scoreType;
    private Long minScore;
    private Long maxScore;
    private Long scoreRatio;
    private String createdDate;
    private Long status;
    private String group;
    private Long index;
}
