package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminAddPointStudentLabReportBOO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsBO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsBOO;
import com.honeyprojects.core.admin.service.AdminAddPointStudentService;
import com.honeyprojects.core.admin.service.AdminCategoryService;
import com.honeyprojects.core.common.base.ResponseObject;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/add-point-student")
public class AdminAddPointStudentTwoPortalRestController {

    @Autowired
    private AdminAddPointStudentService addPointService;

    @Autowired
    private AdminCategoryService adminCategoryService;

    // api dùng để cộng mật ong danh sách sinh viên đã pass xưởng
    @PostMapping("/lab-report")
    public ResponseEntity addPointToStudentLabReport(@RequestBody AdminAddPointStudentLabReportBOO adminAddPointStudentBO) throws IOException {
        return ResponseEntity.ok(addPointService.addPointToStudentLabReport(adminAddPointStudentBO));
    }

    // api dùng để lấy danh sách thể loại
    @GetMapping("/list-category")
    public ResponseEntity getAllListCategory() {
        return ResponseEntity.ok(adminCategoryService.getAllListCategory());
    }

    //========================
    // api dùng để cộng mật ong danh sách sinh viên tham gia sự kiện
    @PostMapping("/portal-events")
    public ResponseEntity createPointToStudentPortalEvents(@RequestBody AdminAddPointStudentPortalEventsBOO adminAddPointStudentBO) throws IOException {
        return ResponseEntity.ok(addPointService.createPointToStudentPortalEvents(adminAddPointStudentBO));
    }
}

