package com.honeyprojects.core.president.service;

import com.honeyprojects.core.admin.model.response.AdminAddItemBO;
import com.honeyprojects.core.admin.model.response.AdminAddItemDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PresidentAddItemToStudentService {

    Boolean exportExcel();

    AdminAddItemBO previewDataImportExcel(MultipartFile file) throws IOException;

    void importData(List<AdminAddItemDTO> lstAddItemDTO) throws IOException;
}
