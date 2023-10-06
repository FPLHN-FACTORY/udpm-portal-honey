package com.honeyprojects.core.teacher.service;

import com.honeyprojects.core.teacher.model.request.TeacherAddPointRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

public interface TeacherExcelAddPointService {

    Boolean importFromExcel(MultipartFile file) ;

    Boolean exportExcel();
}
