package com.honeyprojects.core.president.controller;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.teacher.model.request.TeacherAddPointRequest;
import com.honeyprojects.core.teacher.model.request.TeacherChangeStatusRequest;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.request.TeacherSearchHistoryRequest;
import com.honeyprojects.core.teacher.model.response.TeacherAddHoneyHistoryResponse;
import com.honeyprojects.core.teacher.service.TeacherAddPointService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/president/add-point")
public class PresidentAddPointController {

    @Autowired
    private TeacherAddPointService addPointService;

    @GetMapping("/category")
    public ResponseObject getCategory() {
        return new ResponseObject(addPointService.getCategory());
    }


    @GetMapping("/get-honey")
    public ResponseObject getPointStudent(@Valid TeacherGetPointRequest getPointRequest) {
        return new ResponseObject(addPointService.getPointStudent(getPointRequest));
    }

    @GetMapping("/get-history")
    public PageableObject<TeacherAddHoneyHistoryResponse> getHistory(TeacherSearchHistoryRequest historyRequest) {
        return addPointService.getHistory(historyRequest);
    }

    @GetMapping("/get-list-request")
    public PageableObject<TeacherAddHoneyHistoryResponse> getListRequest(TeacherSearchHistoryRequest historyRequest) {
        return addPointService.getListRequest(historyRequest);
    }

    @PutMapping("/change-status")
    public ResponseObject changeStatus(@RequestBody TeacherChangeStatusRequest changeStatusRequest) {
        return new ResponseObject(addPointService.changeStatus(changeStatusRequest));
    }

    @PostMapping("")
    public ResponseObject addPoint(@Valid @RequestBody TeacherAddPointRequest addPointRequest) {
        return new ResponseObject(addPointService.addPoint(addPointRequest));
    }

    @GetMapping("/search-student")
    public ResponseObject searchStudent(String username) {
        return new ResponseObject(addPointService.searchUser(username));
    }
    @GetMapping("/get-student")
    public ResponseObject getStudent(String id) {
        return new ResponseObject(addPointService.getUserById(id));
    }
}
