package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminAddPointStudentLabReportBO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsBO;
import com.honeyprojects.core.admin.service.AdminAddPointStudentService;
import com.honeyprojects.core.admin.service.AdminCategoryService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/add-point-student")
public class AdminAddPointStudentRestController {

    @Autowired
    private AdminAddPointStudentService addPointService;

    @Autowired
    private AdminCategoryService adminCategoryService;

    // api dùng để cộng mật ong danh sách sinh viên đã pass xưởng
    @PostMapping("/lab-report")
    public ResponseObject addPointToStudentLabReport(@RequestBody AdminAddPointStudentLabReportBO adminAddPointStudentBO) throws IOException {
        return new ResponseObject(addPointService.addPointToStudentLabReport(adminAddPointStudentBO));
    }

    // api dùng để cộng mật ong danh sách sinh viên tham gia sự kiện
    @PostMapping("/portal-events")
    public ResponseObject createPointToStudentPortalEvents(@RequestBody AdminAddPointStudentPortalEventsBO adminAddPointStudentBO) throws IOException {
        return new ResponseObject(addPointService.createPointToStudentPortalEvents(adminAddPointStudentBO));
    }

    // api dùng để lấy danh sách thể loại
    @GetMapping("/list-category")
    public ResponseObject getAllListCategory() {
        return new ResponseObject(adminCategoryService.getAllListCategory());
    }

}

