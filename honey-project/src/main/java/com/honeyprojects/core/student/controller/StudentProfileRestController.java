package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.student.model.response.StudentUserResponse;
import com.honeyprojects.core.student.service.StudentProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/profile")
public class StudentProfileRestController {

    @Autowired
    private UdpmHoney udpmHoney;

    @Autowired
    private StudentProfileService studentProfileService;

    @GetMapping
    public ResponseObject getMyUser() {
        return new ResponseObject(udpmHoney);
    }

    @GetMapping("/honey")
    public ResponseObject getHoneyByUser(){
        return new ResponseObject(studentProfileService.getHoneyByUser());
    }

}
