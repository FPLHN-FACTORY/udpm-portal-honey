package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminAddPointStudentLabReportBOO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsBO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsBOO;
import com.honeyprojects.core.admin.service.AdminAddPointStudentService;
import com.honeyprojects.core.admin.service.AdminCategoryService;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.president.model.response.PresidentAddItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/censor/add-point-student")
public class AdminAddPointStudentRestController {

    @Autowired
    private AdminAddPointStudentService addPointService;

    @Autowired
    private AdminCategoryService adminCategoryService;

    // api dùng để cộng mật ong danh sách sinh viên đã pass xưởng
    @PostMapping("/lab-report")
    public ResponseObject addPointToStudentLabReport(@RequestBody AdminAddPointStudentLabReportBOO adminAddPointStudentBO) throws IOException {
        return new ResponseObject(addPointService.addPointToStudentLabReport(adminAddPointStudentBO));
    }
    // api export excel
    @PostMapping("/lab-report/export")
    public ResponseObject exportTemplateLabReport() {
        return new ResponseObject(addPointService.exportExcelLabReport());
    }

    @PostMapping("/lab-report/preview-data")
    public ResponseObject previewDataLabReport(@RequestParam("file") MultipartFile file) throws IOException {
        return new ResponseObject(addPointService.previewDataLabReportImportExcel(file));
    }

    @PostMapping("/lab-report/import-data")
    public void importDataLabReport(@RequestBody AdminAddPointStudentLabReportBOO adminAddPointStudentBO) throws IOException {
        addPointService.importDataLabReport(adminAddPointStudentBO);
    }
    //========================
    // api dùng để cộng mật ong danh sách sinh viên tham gia sự kiện
    @PostMapping("/portal-events")
    public ResponseObject createPointToStudentPortalEvents(@RequestBody AdminAddPointStudentPortalEventsBOO adminAddPointStudentBO) throws IOException {
        return new ResponseObject(addPointService.createPointToStudentPortalEvents(adminAddPointStudentBO));
    }

    // api dùng để lấy danh sách thể loại
    @GetMapping("/list-category")
    public ResponseObject getAllListCategory() {
        return new ResponseObject(adminCategoryService.getAllListCategory());
    }

    // api export excel
    @PostMapping("/portal-events/export")
    public ResponseObject exportTemplatePortalEvents() {
        return new ResponseObject(addPointService.exportExcelPortalEvents());
    }

    @PostMapping("/portal-events/preview-data")
    public ResponseObject previewDataPortalEvents(@RequestParam("file") MultipartFile file) throws IOException {
        return new ResponseObject(addPointService.previewDataPortalEventsImportExcel(file));
    }

    @PostMapping("/portal-events/import-data")
    public void importDataPortalEvents(@RequestBody AdminAddPointStudentPortalEventsBO adminAddPointStudentBO) throws IOException {
        addPointService.importDataPortalEvents(adminAddPointStudentBO);
    }

}

