package com.honeyprojects.core.teacher.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.teacher.service.TeacherExcelStudentGiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Quota;

@RestController
@RequestMapping("/api/teacher/list-students")
@CrossOrigin(origins = {"*"})
public class TeacherExcelStudentGiftController {
    @Autowired
    private TeacherExcelStudentGiftService service;

    @GetMapping("/download-template")
    public ResponseEntity<Resource> downloadExcelTemplate() {
        byte[] excelBytes = service.generateTeacherTemplate();

        ByteArrayResource resource = new ByteArrayResource(excelBytes);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=StudentGiftTemplate.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(excelBytes.length)
                .body(resource);
    }

    @PostMapping("/import-excel")
    public ResponseObject importExcel(@RequestParam("file") MultipartFile file){
        return new ResponseObject(service.importFromExcel(file));
    }
}
