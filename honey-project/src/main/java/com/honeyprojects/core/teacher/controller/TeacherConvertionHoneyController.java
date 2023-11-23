package com.honeyprojects.core.teacher.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.teacher.model.request.TeacherConvertionHoneyRequest;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.service.TeacherAddPointService;
import com.honeyprojects.core.teacher.service.TeacherConvertionHoneyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/teacher/convertion-honey")
public class TeacherConvertionHoneyController {

    @Autowired
    private TeacherConvertionHoneyService teacherConvertionHoneyService;

    @Autowired
    private TeacherAddPointService teacherAddPointService;

    @GetMapping("/get-honey")
    public ResponseObject getPointStudent(@Valid TeacherGetPointRequest getPointRequest) {
        return new ResponseObject(teacherAddPointService.getPointStudent(getPointRequest));
    }

    @PostMapping("")
    public ResponseObject addConvertion(@RequestBody TeacherConvertionHoneyRequest convertionHoneyRequest) {
        return new ResponseObject(teacherConvertionHoneyService.addConvertion(convertionHoneyRequest));
    }

    @GetMapping("")
    public ResponseObject listConvertion(@Param("categoryId") String categoryId) {
        return new ResponseObject(teacherConvertionHoneyService.listConvertion(categoryId));
    }

}
