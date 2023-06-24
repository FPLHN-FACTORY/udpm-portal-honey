package com.portalprojects.core.admin.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class AdMissionRequest {

    private String id;

    private String code;

    private String name;

    private int pointMission;

    private Date startDay;

    private Date finishDay;

    private String describeMission;
}
