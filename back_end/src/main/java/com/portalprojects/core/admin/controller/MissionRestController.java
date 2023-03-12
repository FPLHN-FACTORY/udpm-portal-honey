package com.portalprojects.core.admin.controller;

import com.portalprojects.core.admin.service.MissionService;
import com.portalprojects.core.admin.service.impl.MissionServiceImpl;
import com.portalprojects.core.common.base.ResponseObject;
import com.portalprojects.entity.Mission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("api/admin/mission")
public class MissionRestController {

    @Autowired
    private MissionService missionService;

    @GetMapping("")
    public ResponseObject getAll(){
        return new ResponseObject(missionService.getAll());
    }
    @PostMapping("")
    public ResponseObject create(){
        Mission mission = new Mission();
        mission.setName("heeh");
        mission.setCode("M2");
        return new ResponseObject(missionService.createMission(mission));
    }

    @PutMapping("")
    public Boolean update(){
        Mission mission = new Mission();
        mission.setName("heeh");
        mission.setCode("M2");
        return missionService.updateMission(mission,"hehe");
    }

    @DeleteMapping("")
    public Boolean delete(){
        return null;
    }


}
