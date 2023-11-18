package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminAddPointRequest;
import com.honeyprojects.core.admin.model.request.AdminChangeStatusRequest;
import com.honeyprojects.core.admin.model.request.AdminGetPointRequest;
import com.honeyprojects.core.admin.model.request.AdminSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.AdminAddHoneyHistoryResponse;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminPoinResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;

import java.util.List;

public interface AdminAddPointService {
    List<AdminCategoryResponse> getCategory();

    AdminPoinResponse getPointStudent(AdminGetPointRequest getPointRequest);

    PageableObject<AdminAddHoneyHistoryResponse> getHistory(AdminSearchHistoryRequest historyRequest);

    PageableObject<AdminAddHoneyHistoryResponse> getListRequest(AdminSearchHistoryRequest historyRequest);

    History changeStatus(AdminChangeStatusRequest changeStatusRequest);

    History addPoint(AdminAddPointRequest addPointRequest);

    SimpleResponse searchUser(String username);

    SimpleResponse getUserById(String id);

}
