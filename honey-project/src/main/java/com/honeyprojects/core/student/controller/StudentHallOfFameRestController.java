package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.student.model.request.StudentSearchHallOfFameRequest;
import com.honeyprojects.core.student.service.StudentHallOfFameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/hall-of-fame")
public class StudentHallOfFameRestController {

    @Autowired
    private StudentHallOfFameService studentHallOfFameService;

    @GetMapping
    public ResponseObject getPageHallOfFame(StudentSearchHallOfFameRequest request) {
        return new ResponseObject(studentHallOfFameService.getPageHallOfFame(request));
    }

    @GetMapping("/top-3")
    public ResponseObject getTop3Student() {
        return new ResponseObject(studentHallOfFameService.getTop3Student());
    }

    @GetMapping("/profile/{id}")
    public ResponseObject getProfile(@PathVariable("id") String id) {
        return new ResponseObject(studentHallOfFameService.getHoneyByUser(id));
    }

    @GetMapping("/student/{id}")
    public ResponseObject getStudent(@PathVariable("id") String id) {
        return new ResponseObject(studentHallOfFameService.getStudent(id));
    }

}
