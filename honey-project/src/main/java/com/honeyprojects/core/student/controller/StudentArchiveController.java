package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.student.model.request.StudentArchiveFilterRequest;
import com.honeyprojects.core.student.model.request.StudentArchiveOpenChestRequest;
import com.honeyprojects.core.student.model.request.StudentGetArchiveChestRequest;
import com.honeyprojects.core.student.model.request.StudentGetArchiveGiftRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveGetChestResponse;
import com.honeyprojects.core.student.model.response.StudentArchiveResponse;
import com.honeyprojects.core.student.model.response.StudentGetListGiftResponse;
import com.honeyprojects.core.student.service.StudentArchiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("/list-gift")
    public PageableObject<StudentGetListGiftResponse> getListGift(StudentArchiveFilterRequest filterRequest) {
        return service.getListGift(filterRequest);
    }

    @GetMapping("/{id}")
    public ResponseObject detailArchive(@PathVariable("id") String id) {
        return new ResponseObject(service.getArchiveGift(id));
    }

    @DeleteMapping("/{id}")
    public ResponseObject studentUsingGift(@PathVariable("id") String id) {
        return new ResponseObject(service.studentUsingGift(id));
    }

    @PostMapping("/open-chest")
    public ResponseObject openChest(@RequestBody StudentArchiveOpenChestRequest request) {
        return new ResponseObject(service.openChest(request));
    }

    @PutMapping("/{id}")
    public ResponseObject updateArchiveGift(@PathVariable("id") String id) {
        return new ResponseObject(service.updateArchiveGift(id));
    }

    @GetMapping("/list-chest")
    public PageableObject<StudentArchiveGetChestResponse> getChestToArchive(StudentArchiveFilterRequest filterRequest) {
        return service.getChestToArchive(filterRequest);
    }

    @GetMapping("/detail")
    public StudentArchiveResponse detailArchiveGift(StudentGetArchiveGiftRequest request) {
        return service.detailArchiveGift(request);
    }

    @GetMapping("/detail-chest")
    public StudentArchiveGetChestResponse detailArchiveChest(StudentGetArchiveChestRequest request) {
        return service.detailArchiveChest(request);
    }

}
