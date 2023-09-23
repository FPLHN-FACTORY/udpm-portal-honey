package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.service.CensorGetListStudentService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/censor/list-student")
public class CensorGetListStudentRestController {

    @Autowired
    private CensorGetListStudentService censorGetListStudentService;

    @GetMapping("")
    public ResponseObject getList(){
        return new ResponseObject(censorGetListStudentService.listSimpleResponses());
    }

}
