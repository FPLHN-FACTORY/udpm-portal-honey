package com.honeyprojects.core.teacher.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.teacher.service.TeacherExcelAddPointService;
import com.honeyprojects.entity.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/teacher/list-students-add-point")
@CrossOrigin(origins = {"*"})
public class TeacherAddPointExcelCotroller {

    @Autowired
    private TeacherExcelAddPointService service;

    @PostMapping("/import-excel")
    public ResponseObject importExcel(@RequestParam("file") MultipartFile file){
        return new ResponseObject(service.importFromExcel(file));
    }

}
