package com.portalprojects.core.admin.service;

import com.portalprojects.core.admin.model.request.AdCreateMissionRequest;
import com.portalprojects.entity.Mission;

import java.util.ArrayList;


public interface MissionService {

    ArrayList<Mission> getAll();

    Boolean createMission(AdCreateMissionRequest adCreateMissionRequest);

    Boolean updateMission(AdCreateMissionRequest adCreateMissionRequest);

    Boolean deleteMission(String id);

}
