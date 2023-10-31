package com.honeyprojects.core.president.service;

import com.honeyprojects.core.admin.model.response.AdminAddItemBO;
import com.honeyprojects.core.admin.model.response.AdminAddItemDTO;
import com.honeyprojects.core.president.model.response.PresidentAddItemBO;
import com.honeyprojects.core.president.model.response.PresidentAddItemDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PresidentAddItemToStudentService {

    Boolean exportExcel();

    PresidentAddItemBO previewDataImportExcel(MultipartFile file) throws IOException;

    void importData(List<PresidentAddItemDTO> lstAddItemDTO) throws IOException;
}
