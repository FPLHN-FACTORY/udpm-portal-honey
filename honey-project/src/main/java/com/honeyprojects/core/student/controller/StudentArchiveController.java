package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.student.model.request.StudentArchiveFilterRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveResponse;
import com.honeyprojects.core.student.service.StudentArchiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/archive")
public class StudentArchiveController {
    @Autowired
    private StudentArchiveService service;

    @GetMapping("")
    public PageableObject<StudentArchiveResponse> getAllArchiveByIdStudent(StudentArchiveFilterRequest filterRequest){
        return service.getAllGiftArchive(filterRequest);
    }
}
