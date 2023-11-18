package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminAddPointStudentBO;
import com.honeyprojects.core.admin.service.AdminAddPointStudentService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
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

    // api dùng để cộng mật ong danh sách sinh viên đã pass xưởng
    @PostMapping("/lab-report")
    public ResponseObject createImportPoint(@RequestBody AdminAddPointStudentBO adminAddPointStudentBO) throws IOException {
        return new ResponseObject(addPointService.addPointStudent(adminAddPointStudentBO));
    }

}

