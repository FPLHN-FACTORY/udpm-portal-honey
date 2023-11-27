package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.response.AdminExportCategoryResponse;
import com.honeyprojects.core.president.model.response.PresidentExportGiftResponse;
import com.honeyprojects.core.president.model.response.PresidentGiftResponse;
import jakarta.servlet.http.HttpServletResponse;

import java.io.ByteArrayOutputStream;
import java.util.List;

public interface ExportExcelServiceService {
    ByteArrayOutputStream export(HttpServletResponse response
            , List<AdminExportCategoryResponse> lstCategory
            , List<PresidentExportGiftResponse> lstGift, String format, String[] headers);
}
