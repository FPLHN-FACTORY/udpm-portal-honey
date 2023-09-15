package com.honeyprojects.core.teacher.controller;

import com.honeyprojects.core.admin.service.CensorRequestManagerService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/teacher/convertion-honey")
public class TeacherConvertionHoneyController {

    @Autowired
    private CensorRequestManagerService censorRequestManagerService;

    @GetMapping("/user-api")
    public ResponseObject getUserAPI(@RequestParam String code) {
        return new ResponseObject(censorRequestManagerService.getUserApiByCode(code));
    }

}
