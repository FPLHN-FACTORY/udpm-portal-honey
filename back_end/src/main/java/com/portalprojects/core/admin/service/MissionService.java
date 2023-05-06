package com.portalprojects.core.admin.service;

import com.portalprojects.core.admin.model.request.AdCreateMissionRequest;
import com.portalprojects.core.admin.model.response.MyMissionResponse;
import com.portalprojects.entity.Mission;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;


public interface MissionService {

    List<Mission> getAll();

    List<Mission> getAllMissionStudent(String studentCode);

    Mission createMission(AdCreateMissionRequest adCreateMissionRequest);

    Mission updateMission(AdCreateMissionRequest adCreateMissionRequest);

    Mission deleteMission(String id);

    ArrayList<MyMissionResponse> getMyMissionByIdStudent(String id);

}