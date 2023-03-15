package com.portalprojects.core.admin.controller;

import com.portalprojects.core.admin.service.impl.StudentServiceImpl;
import com.portalprojects.core.common.base.ResponseObject;
import com.portalprojects.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("api/admin/student")
public class StudentRestController {

    @Autowired
    private StudentServiceImpl studentService;

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("")
    public ResponseObject getAll(){
        return new ResponseObject(this.studentService.getAll()) ;
    }



}
