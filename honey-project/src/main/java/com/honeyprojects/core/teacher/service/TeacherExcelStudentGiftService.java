package com.honeyprojects.core.teacher.service;


import com.honeyprojects.core.teacher.model.response.TeacherGiftStudentResponse;
import com.honeyprojects.entity.ArchiveGift;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TeacherExcelStudentGiftService {
    byte[] generateTeacherTemplate();

    Boolean importFromExcel(MultipartFile file);
}
