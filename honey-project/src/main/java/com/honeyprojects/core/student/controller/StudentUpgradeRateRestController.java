package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.student.model.request.StudentArchiveUpgradeRateRequest;
import com.honeyprojects.core.student.model.request.StudentUpdateHoneyArchiveRequest;
import com.honeyprojects.core.student.model.request.StudentUpgradeRateRequest;
import com.honeyprojects.core.student.service.StudentUpgradeRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/upgrade-rate")
public class StudentUpgradeRateRestController {

    @Autowired
    private StudentUpgradeRateService studentUpgradeRateService;

    @GetMapping("")
    public ResponseObject getUpgradeRate(StudentUpgradeRateRequest request) {
        return new ResponseObject(studentUpgradeRateService.getUpgradeRate(request));
    }

    @GetMapping("/archive")
    public ResponseObject getArchiveByStudent(StudentArchiveUpgradeRateRequest request) {
        return new ResponseObject(studentUpgradeRateService.getArchiveByUser(request));
    }

    @GetMapping("/condition")
    public ResponseObject getListGiftCondition(String id) {
        return new ResponseObject(studentUpgradeRateService.getListGiftCondition(id));
    }

    @PutMapping("/update")
    public ResponseObject updateQuantity(@RequestBody StudentUpdateHoneyArchiveRequest request){
        return new ResponseObject(studentUpgradeRateService.updateArchive(request));
    }

}
