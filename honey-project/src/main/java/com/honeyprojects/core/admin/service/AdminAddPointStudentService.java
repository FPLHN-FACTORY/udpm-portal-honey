package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminAddPointStudentLabReportBOO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsBOO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AdminAddPointStudentService {

    Boolean addPointToStudentLabReport(AdminAddPointStudentLabReportBOO adminAddPointStudentBO);

    Boolean exportExcelLabReport();

    AdminAddPointStudentLabReportBOO previewDataLabReportImportExcel(MultipartFile file) throws IOException;

    // ====================
    Boolean createPointToStudentPortalEvents(AdminAddPointStudentPortalEventsBOO adminAddPointStudentBO);

    Boolean exportExcelPortalEvents();
}
