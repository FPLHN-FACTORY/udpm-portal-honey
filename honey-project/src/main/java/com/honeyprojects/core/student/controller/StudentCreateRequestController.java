package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.common.base.UdomHoney;
import com.honeyprojects.core.student.model.repuest.StudentCreateRequestConversionRequest;
import com.honeyprojects.core.student.model.repuest.StudentFilterHistoryRequest;
import com.honeyprojects.core.student.model.repuest.StudentHoneyRequest;
import com.honeyprojects.core.student.model.response.StudentCreateResquestConversionResponse;
import com.honeyprojects.core.student.service.StudentCreateResquestConversionService;
import com.honeyprojects.core.student.service.StudentUserApiService;
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
    private UdomHoney udomHoney;

    @Autowired
    private StudentUserApiService studentUserApiService;

    @Autowired
    private StudentHoneyServiceImpl studentHoneyService;

    @Autowired
    private StudentCreateResquestConversionService createRequest;


    @GetMapping("/user-api")
    public ResponseObject getUserApi(){
        return new ResponseObject(udomHoney);
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
