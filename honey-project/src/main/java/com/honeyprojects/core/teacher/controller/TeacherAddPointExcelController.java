package com.honeyprojects.core.teacher.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.teacher.model.response.TeacherAddPointDTO;
import com.honeyprojects.core.teacher.model.response.TeacherExcelAddPointBO;
import com.honeyprojects.core.teacher.service.TeacherAddPointExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/export-excel")
    public ResponseObject exportExcel() {
        return new ResponseObject(service.exportExcel());
    }

    @PostMapping("/create/preview-data")
    public ResponseObject createPreviewImportPoint(@RequestParam("file") MultipartFile file) throws IOException {
        TeacherExcelAddPointBO addPointBO = service.previewDataImportExcel(file);
        return new ResponseObject(addPointBO);
    }
}
