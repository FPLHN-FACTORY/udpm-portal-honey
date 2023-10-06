package com.honeyprojects.core.teacher.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.teacher.service.TeacherExcelAddPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/teacher/list-students-add-point")
@CrossOrigin(origins = {"*"})
public class TeacherAddPointExcelCotroller {

    @Autowired
    private TeacherExcelAddPointService service;

    @PostMapping("/import-excel")
    public ResponseObject importExcel(@RequestParam("file") MultipartFile file) {
        return new ResponseObject(service.importFromExcel(file));
    }

    @PostMapping("/export-excel")
    public ResponseObject exportExcel() {
        return new ResponseObject(service.exportExcel());
    }

}
