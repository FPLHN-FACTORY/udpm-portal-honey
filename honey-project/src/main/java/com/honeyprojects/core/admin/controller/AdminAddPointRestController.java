package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminAddPointRequest;
import com.honeyprojects.core.admin.model.request.AdminChangeStatusRequest;
import com.honeyprojects.core.admin.model.request.AdminGetPointRequest;
import com.honeyprojects.core.admin.model.request.AdminSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.AdminAddHoneyHistoryResponse;
import com.honeyprojects.core.admin.model.response.AdminAddItemDTO;
import com.honeyprojects.core.admin.service.AdminAddPointService;
import com.honeyprojects.core.admin.service.AdminCategoryService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/censor/add-point")
public class AdminAddPointRestController {
    @Autowired
    private AdminAddPointService addPointService;

    @Autowired
    private AdminCategoryService adminCategoryService;

    @GetMapping("/list-category")
    public ResponseObject getAllListCategory() {
        return new ResponseObject(addPointService.getCategory());
    }

    @GetMapping("/get-honey")
    public ResponseObject getPointStudent(@Valid AdminGetPointRequest getPointRequest) {
        return new ResponseObject(addPointService.getPointStudent(getPointRequest));
    }

    @GetMapping("/get-history")
    public PageableObject<AdminAddHoneyHistoryResponse> getHistory(AdminSearchHistoryRequest historyRequest) {
        return addPointService.getHistory(historyRequest);
    }

    @GetMapping("/get-list-request")
    public PageableObject<AdminAddHoneyHistoryResponse> getListRequest(AdminSearchHistoryRequest historyRequest) {
        return addPointService.getListRequest(historyRequest);
    }

    @PutMapping("/change-status")
    public ResponseObject changeStatus(@RequestBody AdminChangeStatusRequest changeStatusRequest) {
        return new ResponseObject(addPointService.changeStatus(changeStatusRequest));
    }

    @PostMapping("")
    public ResponseObject addPoint(@Valid @RequestBody AdminAddPointRequest addPointRequest) {
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
