package com.honeyprojects.core.president.service.impl;

import com.honeyprojects.core.admin.model.response.AdminAddItemBO;
import com.honeyprojects.core.admin.model.response.AdminAddItemDTO;
import com.honeyprojects.core.president.service.PresidentAddItemToStudentService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class PresidentAddItemToStudentServiceImpl implements PresidentAddItemToStudentService {
    @Override
    public Boolean exportExcel() {
        return null;
    }

    @Override
    public AdminAddItemBO previewDataImportExcel(MultipartFile file) throws IOException {
        return null;
    }

    @Override
    public void importData(List<AdminAddItemDTO> lstAddItemDTO) throws IOException {

    }
}
