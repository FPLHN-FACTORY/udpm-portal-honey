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
// đầu điểm của một sinh viên
public class ScoreTemplateVMDto {

    private String class_StudentId;
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
