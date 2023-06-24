package com.portalprojects.core.admin.controller;

import com.portalprojects.core.admin.model.request.AdMissionRequest;
import com.portalprojects.core.admin.service.MissionDetailService;
import com.portalprojects.core.admin.service.MissionService;
import com.portalprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin/mission")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class MissionRestController {

    @Autowired
    private MissionService missionService;

    @Autowired
    private MissionDetailService missionDetailService;

    @GetMapping("")
    public ResponseObject getAll() {
        return new ResponseObject(missionService.getAll());
    }

    @GetMapping("/student")
    public ResponseObject getAllByStudentCode() {
        return new ResponseObject(missionService.getAllMissionStudent("SV1"));
    }


    @GetMapping("/my-mission/{id}")
    public ResponseObject getMyMissionByIdStudent(@PathVariable("id") String id) {
        return new ResponseObject(missionService.getMyMissionByIdStudent(id));
    }

    @PostMapping("/create")
    public ResponseObject create(@RequestBody AdMissionRequest adCreateMissionRequest) {
        return new ResponseObject(missionService.createMission(adCreateMissionRequest));
    }

    @PutMapping("/update/{id}")
    public ResponseObject update(@PathVariable("id") String id,
                                 @RequestBody AdMissionRequest adCreateMissionRequest) {
        adCreateMissionRequest.setId(id);
        return new ResponseObject(missionService.updateMission(adCreateMissionRequest));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseObject delete(@PathVariable("id") String id) {
        return new ResponseObject(missionService.deleteMission(id));
    }

    @PutMapping("/add-mission-detail/{id}")
    public ResponseObject addMissionDetail(@PathVariable("id") String id) {
        try {
            return new ResponseObject(this.missionDetailService.addMissionDetail(id));
        }catch (Exception e){
            return null;
        }
    }

    @GetMapping("/get-one-my-mission/{code}")
    public ResponseObject getAllByStudentCode(@PathVariable("code")String code) {
        return new ResponseObject(this.missionService.getOneMyMissionByMissionCode(code));
    }

}
