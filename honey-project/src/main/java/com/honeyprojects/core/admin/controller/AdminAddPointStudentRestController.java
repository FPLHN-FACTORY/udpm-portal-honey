package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminAddPointStudentLabReportBOO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsBO;
import com.honeyprojects.core.admin.model.request.AdminHistoryApprovedSearchRequest;
import com.honeyprojects.core.admin.model.response.CensorTransactionRequestResponse;
import com.honeyprojects.core.admin.service.AdminAddPointStudentService;
import com.honeyprojects.core.admin.service.AdminCategoryService;
import com.honeyprojects.core.common.base.PageableObject;
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
@RequestMapping("/api/censor/add-point-student")
public class AdminAddPointStudentRestController {

    @Autowired
    private AdminAddPointStudentService addPointService;

    @Autowired
    private AdminCategoryService adminCategoryService;

    @GetMapping("/history-event")
    public PageableObject<CensorTransactionRequestResponse> historyEvent(AdminHistoryApprovedSearchRequest dataSearch) {
            return addPointService.getHistoryEvent(dataSearch);
    }

    @GetMapping("/history-project")
    public PageableObject<CensorTransactionRequestResponse> historyProject(AdminHistoryApprovedSearchRequest dataSearch) {
        return addPointService.getHistoryProject(dataSearch);
    }

    @PostMapping("/lab-report/preview-data")
    public ResponseObject previewDataLabReport(@RequestParam("file") MultipartFile file) throws IOException {
        return new ResponseObject(addPointService.previewDataLabReportImportExcel(file));
    }

    @PostMapping("/lab-report/import-data")
    public void importDataLabReport(@RequestBody AdminAddPointStudentLabReportBOO adminAddPointStudentBO) throws IOException {
        addPointService.importDataLabReport(adminAddPointStudentBO);
    }

    @PostMapping("/portal-events/preview-data")
    public ResponseObject previewDataPortalEvents(@RequestParam("file") MultipartFile file) throws IOException {
        return new ResponseObject(addPointService.previewDataPortalEventsImportExcel(file));
    }

    @PostMapping("/portal-events/import-data")
    public void importDataPortalEvents(@RequestBody AdminAddPointStudentPortalEventsBO adminAddPointStudentBO) throws IOException {
        addPointService.importDataPortalEvents(adminAddPointStudentBO);
    }

    @GetMapping("/list-category")
    public ResponseObject getAllListCategory() {
        return new ResponseObject(adminCategoryService.getAllCategoryFreeByTwoModule());
    }

    // test
    @GetMapping("/portal-events/export")
    public ResponseEntity<byte[]> exportTemplatePortalEvents(HttpServletResponse response) {
        try {
            ByteArrayOutputStream file = addPointService.exportExcelPortalEventsClass(response);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "sample.xlsx");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(file.toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/lab-report/export")
    public ResponseEntity<byte[]> exportTemplateLabReport(HttpServletResponse response) {
        try {
            ByteArrayOutputStream file = addPointService.exportExcelLabReportClass(response);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "sample.xlsx");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(file.toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

