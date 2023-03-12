package com.portalprojects.core.admin.service.impl;

import com.portalprojects.core.admin.repository.AdMissionRepository;
import com.portalprojects.core.admin.service.MissionService;
import com.portalprojects.entity.Mission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MissionServiceImpl implements MissionService {

    @Autowired
    private AdMissionRepository missionRepository;

    @Override
    public ArrayList<Mission> getAll() {
        System.out.println(missionRepository.getAll());
      return missionRepository.getAll();
    }

    @Override
    public Boolean createMission(Mission mission) {
        try {
            missionRepository.save(mission);
        }catch (Exception ex){
            return false;
        }
        return true;
    }

    @Override
    public Boolean updateMission(Mission mission, String ma) {
        try {
            Mission firtMission = missionRepository.getById(ma);
            missionRepository.delete(firtMission);
            missionRepository.save(mission);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return false;
    }

    @Override
    public Boolean deleteMission(String ma) {
        try {
            Mission firtMission = missionRepository.getById(ma);
            missionRepository.delete(firtMission);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return null;
    }

}
