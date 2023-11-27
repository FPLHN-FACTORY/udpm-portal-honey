package com.honeyprojects.core.teacher.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.teacher.model.response.TeacherAddPointDTO;
import com.honeyprojects.core.teacher.model.response.TeacherExcelAddPointBO;
import com.honeyprojects.core.teacher.service.TeacherAddPointExcelService;
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
import java.util.List;

@RestController
@RequestMapping("/api/teacher/list-students-add-point")
public class TeacherAddPointExcelController {

    @Autowired
    private TeacherAddPointExcelService service;

//    @PostMapping("/import-excel")
//    public ResponseObject importExcel(@RequestParam("file") MultipartFile file) {
//        return new ResponseObject(service.importFromExcel(file));
//    }

    @PostMapping("/import-excel")
    public void importExcel(@RequestBody List<TeacherAddPointDTO> lstTeacherAddPointDTO) {
        service.importExcel(lstTeacherAddPointDTO);
    }

    @GetMapping("/export-excel")
    public ResponseEntity<byte[]> exportExcel(HttpServletResponse response) {
        try {
            ByteArrayOutputStream file = service.exportExcel(response);
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

    @PostMapping("/create/preview-data")
    public ResponseObject createPreviewImportPoint(@RequestParam("file") MultipartFile file) throws IOException {
        TeacherExcelAddPointBO addPointBO = service.previewDataImportExcel(file);
        return new ResponseObject(addPointBO);
    }
}
