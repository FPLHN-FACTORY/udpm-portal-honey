package com.honeyprojects.core.teacher.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.teacher.model.request.TeacherAddPointRequest;
import com.honeyprojects.core.teacher.model.request.TeacherChangeStatusRequest;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.request.TeacherSearchHistoryRequest;
import com.honeyprojects.core.teacher.model.request.TeacherStudentRequest;
import com.honeyprojects.core.teacher.service.TeacherAddPointService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/teacher/add-point")
@Validated
public class TeacherAddPointRestController {
    @Autowired
    private TeacherAddPointService addPointService;

    @GetMapping("/category")
    public ResponseObject getCategory() {
        return new ResponseObject(addPointService.getCategory());
    }

    @GetMapping("/student")
    public ResponseObject getStudent(@Valid TeacherStudentRequest studentRequset) {
        return new ResponseObject(addPointService.getStudent(studentRequset));
    }

    @GetMapping("/get-honey")
    public ResponseObject getPointStudent(@Valid TeacherGetPointRequest getPointRequest) {
        return new ResponseObject(addPointService.getPointStudent(getPointRequest));
    }

    @GetMapping("/get-history")
    public ResponseObject getHistory(TeacherSearchHistoryRequest historyRequest) {
        return new ResponseObject(addPointService.getHistory(historyRequest));
    }

    @PutMapping("/change-status")
    public ResponseObject changeStatus(@RequestBody TeacherChangeStatusRequest changeStatusRequest) {
        return new ResponseObject(addPointService.changeStatus(changeStatusRequest));
    }

    @PostMapping("")
    public ResponseObject addPoint(@Valid @RequestBody TeacherAddPointRequest addPointRequest) {
        return new ResponseObject(addPointService.addPoint(addPointRequest));
    }
}
