package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.admin.service.AdminCategoryService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.student.model.request.StudentCreateRequestConversionRequest;
import com.honeyprojects.core.student.model.request.StudentFilterHistoryRequest;
import com.honeyprojects.core.student.model.request.StudentHoneyRequest;
import com.honeyprojects.core.student.model.response.StudentCreateResquestConversionResponse;
import com.honeyprojects.core.student.service.StudentCreateResquestConversionService;
import com.honeyprojects.core.student.service.impl.StudentHoneyServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/createResquest")
public class StudentCreateRequestController {

    @Autowired
    private UdpmHoney udpmHoney;

    @Autowired
    private StudentHoneyServiceImpl studentHoneyService;

    @Autowired
    private StudentCreateResquestConversionService createRequest;

    @Autowired
    private AdminCategoryService adminCategoryService;

    @GetMapping("/list-category")
    public ResponseObject getAllListCategory() {
        return new ResponseObject(adminCategoryService.getAllListCategory());
    }


    @GetMapping("/user-api")
    public ResponseObject getUserApi(){
        return new ResponseObject(udpmHoney);
    }

    @GetMapping("/honey-point")
    public ResponseObject getPointHoney(StudentHoneyRequest honeyRequest){
        System.out.println("-------get point -------" +honeyRequest);
        return new ResponseObject( studentHoneyService.getPoint(honeyRequest));
    }

    @PostMapping("/create-resquest-conversion")
    public ResponseObject createRequest(@RequestBody StudentCreateRequestConversionRequest conversionRequest){
        return new ResponseObject(createRequest.addRequestConversion(conversionRequest));
    }

    @GetMapping("/history")
    public PageableObject<StudentCreateResquestConversionResponse> getHistory(StudentFilterHistoryRequest filter){
        return createRequest.getHistory(filter);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRequest(@PathVariable String id){
        createRequest.deleteRequestById(id);
    }



}
