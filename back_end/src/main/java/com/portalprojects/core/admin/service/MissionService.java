package com.portalprojects.core.admin.service;

import com.portalprojects.entity.Mission;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


public interface MissionService {
    ArrayList<Mission> getAll();

    Boolean createMission(Mission mission);

    Boolean updateMission(Mission mission,String ma);

    Boolean deleteMission(String ma);

}
