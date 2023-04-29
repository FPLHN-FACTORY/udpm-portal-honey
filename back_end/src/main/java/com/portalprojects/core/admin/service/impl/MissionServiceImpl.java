package com.portalprojects.core.admin.service.impl;

import com.portalprojects.core.admin.model.request.AdCreateMissionRequest;
import com.portalprojects.core.admin.repository.AdMissionRepository;
import com.portalprojects.core.admin.service.MissionService;
import com.portalprojects.entity.Mission;
import com.portalprojects.repository.MissionRepository;
import com.portalprojects.util.AutomaticCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MissionServiceImpl implements MissionService {

    @Autowired
    private AdMissionRepository missionRepository;

    @Autowired
    private AutomaticCode automaticCode;

    @Autowired
    @Qualifier(MissionRepository.NAME)
    private MissionRepository repository;

    @Override
    public List<Mission> getAll() {
        return missionRepository.findAll();
    }

    @Override
    public Mission createMission(AdCreateMissionRequest adCreateMissionRequest) {
        Mission mission = new Mission();
        String text = "NV";
        String nearestCode = repository.getNearestCodeMission();
        String code = automaticCode.autumaticCode(text, nearestCode);
        mission.setCode(code);
        mission.setName(adCreateMissionRequest.getName());
        mission.setPointMission(adCreateMissionRequest.getPointMission());
        mission.setDescribeMission(adCreateMissionRequest.getDescribeMission());
        return missionRepository.save(mission);
    }

    @Override
    public Mission updateMission(AdCreateMissionRequest adCreateMissionRequest) {
        Optional<Mission> mission = missionRepository.findById(adCreateMissionRequest.getId());
        mission.get().setName(adCreateMissionRequest.getName());
        mission.get().setPointMission(adCreateMissionRequest.getPointMission());
        mission.get().setDescribeMission(adCreateMissionRequest.getDescribeMission());
        return missionRepository.save(mission.get());
    }

    @Override
    public Mission deleteMission(String id) {
        Optional<Mission> mission = missionRepository.findById(id);
        missionRepository.delete(mission.get());
        return mission.get();
    }

}
