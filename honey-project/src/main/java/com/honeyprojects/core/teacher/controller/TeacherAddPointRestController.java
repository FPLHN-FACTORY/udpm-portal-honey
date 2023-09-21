package com.honeyprojects.core.teacher.controller;

import com.honeyprojects.core.admin.service.CensorRequestManagerService;
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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/teacher/add-point")
public class TeacherAddPointRestController {
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

    @PutMapping("/change-status")
    public ResponseObject changeStatus(@RequestBody TeacherChangeStatusRequest changeStatusRequest) {
        return new ResponseObject(addPointService.changeStatus(changeStatusRequest));
    }

    @PostMapping("")
    public ResponseObject addPoint(@Valid @RequestBody TeacherAddPointRequest addPointRequest) {
        return new ResponseObject(addPointService.addPoint(addPointRequest));
    }

    //UserAPi
    @Autowired
    private CensorRequestManagerService requestManagerService;

    @GetMapping("/user-api")
    public ResponseObject getUserApiByCode(String code) {
        return new ResponseObject(requestManagerService.getUserApiByCode(code));
    }
    @GetMapping("/user-api/{id}")
    public ResponseObject getUserApiById(@PathVariable String id) {
        return new ResponseObject(requestManagerService.getUserApiById(id));
    }
}
