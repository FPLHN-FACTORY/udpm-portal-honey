package com.portalprojects.core.admin.service;

import com.portalprojects.core.admin.model.request.AdMissionRequest;
import com.portalprojects.core.admin.model.response.MyMissionResponse;
import com.portalprojects.entity.Mission;

import java.util.ArrayList;
import java.util.List;


public interface MissionService {

    List<Mission> getAll();

    List<Mission> getAllMissionStudent(String studentCode);

    Mission createMission(AdMissionRequest adCreateMissionRequest);

    Mission updateMission(AdMissionRequest adCreateMissionRequest);

    Mission deleteMission(String id);

    ArrayList<MyMissionResponse> getMyMissionByIdStudent(String id);


    MyMissionResponse getOneMyMissionByMissionCode(String missionCode);

}
