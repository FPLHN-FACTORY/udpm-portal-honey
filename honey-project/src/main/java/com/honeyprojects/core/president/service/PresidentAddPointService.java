package com.honeyprojects.core.president.service;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.teacher.model.request.TeacherAddPointRequest;
import com.honeyprojects.core.teacher.model.request.TeacherChangeStatusRequest;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.request.TeacherSearchHistoryRequest;
import com.honeyprojects.core.teacher.model.response.TeacherAddHoneyHistoryResponse;
import com.honeyprojects.core.teacher.model.response.TeacherCategoryResponse;
import com.honeyprojects.core.teacher.model.response.TeacherPointResponse;
import com.honeyprojects.entity.History;

import java.util.List;

public interface PresidentAddPointService {

    List<TeacherCategoryResponse> getCategory();

    TeacherPointResponse getPointStudent(TeacherGetPointRequest getPointRequest);

    PageableObject<TeacherAddHoneyHistoryResponse> getHistory(TeacherSearchHistoryRequest historyRequest);

    PageableObject<TeacherAddHoneyHistoryResponse> getListRequest(TeacherSearchHistoryRequest historyRequest);

    History changeStatus(TeacherChangeStatusRequest changeStatusRequest);

    History addPoint(TeacherAddPointRequest addPointRequest);

    SimpleResponse searchUser(String username);

    SimpleResponse getUserById(String id);
}
