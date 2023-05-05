package com.portalprojects.core.admin.controller;

import com.portalprojects.core.admin.service.impl.StudentServiceImpl;
import com.portalprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/admin/student")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class StudentRestController {

    @Autowired
    private StudentServiceImpl studentService;

    @GetMapping("")
    public ResponseObject getAll(){
        return new ResponseObject(this.studentService.getAll()) ;
    }

}
