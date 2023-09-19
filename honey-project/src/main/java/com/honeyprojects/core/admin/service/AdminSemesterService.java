package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminSearchSemesterRequest;
import com.honeyprojects.core.admin.model.request.AdminSemesterRequest;
import com.honeyprojects.core.admin.model.response.AdminSemesterResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Semester;

import java.util.List;

public interface AdminSemesterService {

    List<AdminSemesterResponse> getAllListSemester();

    PageableObject<AdminSemesterResponse> getAllSemesterByAdmin(AdminSearchSemesterRequest request);

    Semester getOne(String id);

    Semester deleteSemester(String id);

    Semester addSemester(AdminSemesterRequest request);

    Semester updateSemester(AdminSemesterRequest request, String id);

}
