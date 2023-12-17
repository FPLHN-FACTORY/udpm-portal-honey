package com.honeyprojects.core.president.service;

import com.honeyprojects.core.president.model.request.PresidentStatusRequest;
import com.honeyprojects.core.president.model.response.PresidentAddItemBO;
import com.honeyprojects.core.president.model.response.PresidentAddItemDTO;
import com.honeyprojects.entity.History;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public interface PresidentAddItemToStudentService {

    ByteArrayOutputStream exportExcel(HttpServletResponse response);

    PresidentAddItemBO previewDataImportExcel(MultipartFile file) throws IOException;

    void importData(List<PresidentAddItemDTO> lstAddItemDTO) throws IOException;

    History changeStatus(PresidentStatusRequest request);
}
