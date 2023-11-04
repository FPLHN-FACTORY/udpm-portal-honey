package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.student.model.request.StudentArchiveUpgradeRateRequest;
import com.honeyprojects.core.student.service.StudentUpgradeRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/upgrade-rate")
public class StudentUpgradeRateRestController {

    @Autowired
    private StudentUpgradeRateService studentUpgradeRateService;

    @GetMapping("/archive")
    public ResponseObject getArchiveByStudent(StudentArchiveUpgradeRateRequest request){
        return new ResponseObject( studentUpgradeRateService.getArchiveByUser(request));
    }
}
