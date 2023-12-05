package com.honeyprojects.core.teacher.service;

import com.honeyprojects.core.teacher.model.response.TeacherAddPointDTO;
import com.honeyprojects.core.teacher.model.response.TeacherExcelAddPointBO;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public interface TeacherAddPointExcelService {

    ByteArrayOutputStream exportExcel(HttpServletResponse response);

    TeacherExcelAddPointBO previewDataImportExcel(MultipartFile file) throws IOException;

    void importExcel(List<TeacherAddPointDTO> lstTeacherAddPointDTO);
}
