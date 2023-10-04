package com.honeyprojects.core.teacher.service;


import com.honeyprojects.core.teacher.model.response.TeacherExcelMessageResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TeacherExcelStudentGiftService {
    byte[] generateTeacherTemplate();

    TeacherExcelMessageResponse importFromExcel(MultipartFile file);
}
