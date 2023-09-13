package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminSearchSemesterRequest;
import com.honeyprojects.core.admin.model.request.AdminSemesterRequest;
import com.honeyprojects.core.admin.service.AdminSemesterService;
import com.honeyprojects.core.common.base.ResponseObject;
import jakarta.validation.Valid;
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
@RequestMapping("/api/censor/semester")
public class AdminSemesterController {

    @Autowired
    private AdminSemesterService adminSemesterService;

    @GetMapping("")
    public ResponseObject getAllSemesterByAdmin(AdminSearchSemesterRequest request) {
        return new ResponseObject(adminSemesterService.getAllSemesterByAdmin(request));
    }

    @GetMapping("/list")
    public ResponseObject getAllListSemester() {
        return new ResponseObject(adminSemesterService.getAllListSemester());
    }

    @GetMapping("/detail/{id}")
    public ResponseObject detailSemester(@PathVariable("id") String id) {
        return new ResponseObject(adminSemesterService.getOne(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseObject deleteSemester(@PathVariable("id") String id) {
        return new ResponseObject(adminSemesterService.deleteSemester(id));
    }

    @PostMapping("/add")
    public ResponseObject addSemester(@Valid @RequestBody AdminSemesterRequest request) {
        return new ResponseObject(adminSemesterService.addSemester(request));
    }

    @PutMapping("/{id}")
    public ResponseObject updateSemester(@RequestBody @Valid AdminSemesterRequest request, @PathVariable("id") String id) {
        return new ResponseObject(adminSemesterService.updateSemester(request, id));
    }

}
