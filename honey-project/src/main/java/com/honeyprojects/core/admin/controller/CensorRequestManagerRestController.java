package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.CensorChangeStatusRequest;
import com.honeyprojects.core.admin.model.request.CensorSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.CensorAddHoneyRequestResponse;
import com.honeyprojects.core.admin.service.CensorRequestManagerService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/censor/request-manager")
@Validated
public class CensorRequestManagerRestController {
    @Autowired
    private CensorRequestManagerService requestManagerService;

    @GetMapping("/add-point")
    public PageableObject<CensorAddHoneyRequestResponse> getHistory(CensorSearchHistoryRequest historyRequest) {
        return requestManagerService.getHistory(historyRequest);
    }

    @GetMapping("/request-manager/{id}")
    public ResponseObject getRequest(@PathVariable("id") String idRequest) {
        return new ResponseObject(requestManagerService.getRequest(idRequest));
    }

    @PutMapping("/change-status")
    public ResponseObject changeStatus(@RequestBody CensorChangeStatusRequest changeStatusRequest) {
        return new ResponseObject(requestManagerService.changeStatus(changeStatusRequest));
    }

    //UserAPi
    @GetMapping("/user-api")
    public ResponseObject getUserApiByCode(String code) {
        return new ResponseObject(requestManagerService.getUserApiByCode(code));
    }
    @GetMapping("/user-api/{id}")
    public ResponseObject getUserApiById(@PathVariable String id) {
        return new ResponseObject(requestManagerService.getUserApiById(id));
    }
}