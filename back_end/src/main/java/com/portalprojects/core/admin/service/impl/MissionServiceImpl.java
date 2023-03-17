package com.portalprojects.core.admin.service.impl;

import com.portalprojects.core.admin.model.request.AdCreateMissionRequest;
import com.portalprojects.core.admin.repository.AdMissionRepository;
import com.portalprojects.core.admin.service.MissionService;
import com.portalprojects.entity.Mission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class MissionServiceImpl implements MissionService {

    @Autowired
    private AdMissionRepository missionRepository;

    @Override
    public ArrayList<Mission> getAll() {
        return missionRepository.getAll();
    }

    @Override
    public Boolean createMission(AdCreateMissionRequest adCreateMissionRequest) {
        try {
            Mission mission = new Mission();
            mission.setCode(adCreateMissionRequest.getCode());
            mission.setName(adCreateMissionRequest.getName());
            mission.setPointMission(adCreateMissionRequest.getPointMission());
            mission.setDescribeMission(adCreateMissionRequest.getDescribeMission());
            mission.setCreatedDate(4252342l);
            mission.setLastModifiedDate(4252342l);
            missionRepository.save(mission);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean updateMission(AdCreateMissionRequest adCreateMissionRequest) {
        try {
            Optional<Mission> mission = missionRepository.findById(adCreateMissionRequest.getId());
            mission.get().setName(adCreateMissionRequest.getName());
            mission.get().setPointMission(adCreateMissionRequest.getPointMission());
            mission.get().setDescribeMission(adCreateMissionRequest.getDescribeMission());
            missionRepository.save(mission.get());
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean deleteMission(String id) {
        Optional<Mission> mission = missionRepository.findById(id);
        missionRepository.delete(mission.get());
        return true;
    }
}
