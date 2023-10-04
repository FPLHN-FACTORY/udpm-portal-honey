package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.student.model.request.StudentArchiveFilterRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveResponse;
import com.honeyprojects.core.student.service.StudentArchiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/archive")
public class StudentArchiveController {
    @Autowired
    private StudentArchiveService service;

    @GetMapping("")
    public PageableObject<StudentArchiveResponse> getAllArchiveByIdStudent(StudentArchiveFilterRequest filterRequest) {
        return service.getAllGiftArchive(filterRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseObject studentUsingGift(@PathVariable("id") String id) {
        return new ResponseObject(service.studentUsingGift(id));
    }

}
