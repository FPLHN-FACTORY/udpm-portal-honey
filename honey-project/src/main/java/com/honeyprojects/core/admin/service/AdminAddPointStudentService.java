package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminAddPointStudentLabReportBOO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsBO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsBOO;
import com.honeyprojects.core.president.model.response.PresidentAddItemDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AdminAddPointStudentService {

    Boolean addPointToStudentLabReport(AdminAddPointStudentLabReportBOO adminAddPointStudentBO);

    Boolean exportExcelLabReport();

    AdminAddPointStudentLabReportBOO previewDataLabReportImportExcel(MultipartFile file) throws IOException;

    void importDataLabReport(AdminAddPointStudentLabReportBOO adminAddPointStudentBO) throws IOException;

    // ====================
    Boolean createPointToStudentPortalEvents(AdminAddPointStudentPortalEventsBOO adminAddPointStudentBO);

    Boolean exportExcelPortalEvents();

    AdminAddPointStudentPortalEventsBO previewDataPortalEventsImportExcel(MultipartFile file) throws IOException;

    void importDataPortalEvents(AdminAddPointStudentPortalEventsBO adminAddPointStudentBO);
}
