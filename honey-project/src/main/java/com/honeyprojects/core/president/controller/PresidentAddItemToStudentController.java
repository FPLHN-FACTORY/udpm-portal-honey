package com.honeyprojects.core.president.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.president.model.response.PresidentAddItemDTO;
import com.honeyprojects.core.president.service.PresidentAddItemToStudentService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping("/api/president")
public class PresidentAddItemToStudentController {

    @Autowired
    private PresidentAddItemToStudentService presidentAddItemToStudentService;

//    @PostMapping("/export")
//    public ResponseObject exportTemplate() {
//        return new ResponseObject(presidentAddItemToStudentService.exportExcel());
//    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportExcel(HttpServletResponse response) {
        try {
            ByteArrayOutputStream file = presidentAddItemToStudentService.exportExcel(response);
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

    @PostMapping("/preview-data")
    public ResponseObject previewData(@RequestParam("file") MultipartFile file) throws IOException {
        return new ResponseObject(presidentAddItemToStudentService.previewDataImportExcel(file));
    }

    @PostMapping("/import-data")
    public void importData(@RequestBody List<PresidentAddItemDTO> lstPresidentAddItemDTO) throws IOException {
        presidentAddItemToStudentService.importData(lstPresidentAddItemDTO);
    }
}
