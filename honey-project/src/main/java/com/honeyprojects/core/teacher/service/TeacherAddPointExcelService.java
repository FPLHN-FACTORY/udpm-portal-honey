package com.honeyprojects.core.teacher.service;

import com.honeyprojects.core.teacher.model.response.TeacherAddPointDTO;
import com.honeyprojects.core.teacher.model.response.TeacherExcelAddPointBO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface TeacherAddPointExcelService {

    Boolean importFromExcel(MultipartFile file);

    Boolean exportExcel();

    TeacherExcelAddPointBO previewDataImportExcel(MultipartFile file) throws IOException;

    void importExcel(List<TeacherAddPointDTO> lstTeacherAddPointDTO);
}
