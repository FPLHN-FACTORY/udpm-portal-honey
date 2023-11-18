package com.honeyprojects.core.teacher.service;

import com.honeyprojects.core.teacher.model.response.TeacherExcelAddPoinBO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface TeacherExcelAddPointService {

    Boolean importFromExcel(MultipartFile file);

    Boolean exportExcel();

    TeacherExcelAddPoinBO previewDataImportExcel(MultipartFile file) throws IOException;

    TeacherExcelAddPoinBO saveData(TeacherExcelAddPoinBO teacherExcelAddPoinBO);
}
