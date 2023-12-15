package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.student.service.StudentHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/history")
public class StudentHistoryRestController {

    @Autowired
    private StudentHistoryService service;

    @GetMapping
    public ResponseObject getHistory(Integer type, @RequestParam(value = "page", defaultValue = "0") Integer page) {
        return new ResponseObject(service.getListHistory(type, page));
    }
    @GetMapping("/request")
    public ResponseObject getRequest(Integer type, @RequestParam(value = "page", defaultValue = "0") Integer page) {
        return new ResponseObject(service.getListRequest(type, page));
    }
}
