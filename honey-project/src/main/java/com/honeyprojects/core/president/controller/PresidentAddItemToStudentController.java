package com.honeyprojects.core.president.controller;

import com.honeyprojects.core.admin.model.response.AdminAddItemDTO;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.president.model.response.PresidentAddItemDTO;
import com.honeyprojects.core.president.service.PresidentAddItemToStudentService;
import com.honeyprojects.core.teacher.model.response.TeacherExcelAddPoinBO;
import com.honeyprojects.core.teacher.service.TeacherExcelAddPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/president")
@CrossOrigin(origins = {"*"})
public class PresidentAddItemToStudentController {

    @Autowired
    private PresidentAddItemToStudentService presidentAddItemToStudentService;

    @PostMapping("/export")
    public ResponseObject exportTemplate() {
        return new ResponseObject(presidentAddItemToStudentService.exportExcel());
    }

    @PostMapping("/preview-data")
    public ResponseObject previewData(@RequestParam("file") MultipartFile file) throws IOException {
        return new ResponseObject(presidentAddItemToStudentService.previewDataImportExcel(file));
    }

    @PostMapping("/import-data")
    public void importData(@RequestBody List<PresidentAddItemDTO> lstPresidentAddItemDTO) throws IOException {
        presidentAddItemToStudentService.importData(lstPresidentAddItemDTO);
    }
}
