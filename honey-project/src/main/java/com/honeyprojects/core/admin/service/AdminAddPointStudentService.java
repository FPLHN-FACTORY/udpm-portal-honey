package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminAddPointStudentLabReportBO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsBO;

public interface AdminAddPointStudentService {

    Boolean addPointToStudentLabReport(AdminAddPointStudentLabReportBO adminAddPointStudentBO);

    Boolean createPointToStudentPortalEvents(AdminAddPointStudentPortalEventsBO adminAddPointStudentBO);

}
