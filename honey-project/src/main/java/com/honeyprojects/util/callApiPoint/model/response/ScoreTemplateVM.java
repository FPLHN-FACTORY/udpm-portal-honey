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

    private String scoreTemplateName;
    private Double scoreTemplatePoint;
}
