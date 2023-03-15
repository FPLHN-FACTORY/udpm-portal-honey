package com.portalprojects.core.admin.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdCreatePointRequest {

    private int score;

    private String note;

    private String studentId;
}
