package com.honeyprojects.util.callApiPoint.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
// đầu điểm
public class ScoreTemplateDto {
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
