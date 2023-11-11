package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminSemesterRequest;
import com.honeyprojects.entity.Semester;

public interface AdminSemesterLogService {

    Boolean addSemester(AdminSemesterRequest request);

    Boolean updateSemester(AdminSemesterRequest request, String id);

}
