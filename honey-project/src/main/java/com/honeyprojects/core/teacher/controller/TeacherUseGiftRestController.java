package com.honeyprojects.core.teacher.controller;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.teacher.model.request.TeacherAcceptAllRequest;
import com.honeyprojects.core.teacher.model.request.TeacherGetUseGiftRequest;
import com.honeyprojects.core.teacher.model.request.TeacherUseGiftCancelRequest;
import com.honeyprojects.core.teacher.service.TeacherUseGiftRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teacher/use-gift")
public class TeacherUseGiftRestController {
    @Autowired
    private TeacherUseGiftRequest service;

    @GetMapping()
    public ResponseObject getRequest(TeacherGetUseGiftRequest filter) {
        return new ResponseObject(new PageableObject<>(service.getTeacherUseGiftRequest(filter)));
    }

    @GetMapping("/get-filter/class")
    public ResponseObject getFilterClass() {
        return new ResponseObject(service.getFilterClass());
    }

    @GetMapping("/accept/{id}")
    public ResponseObject acceptRequest(@PathVariable String id) {
        return new ResponseObject(service.acceptRequest(id));
    }

    @PostMapping("/accept-all")
    public ResponseObject acceptAllRequest(@RequestBody TeacherAcceptAllRequest request) {
        return new ResponseObject(service.acceptAllRequest(request));
    }

    @PostMapping("/cancel/{id}")
    public ResponseObject acceptRequest(@PathVariable String id, @RequestBody TeacherUseGiftCancelRequest request) {
        return new ResponseObject(service.cancelRequest(id, request.getNote()));
    }

}
