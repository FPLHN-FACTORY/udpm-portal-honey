package com.honeyprojects.core.teacher.service;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.teacher.model.request.TeacherAddPointRequest;
import com.honeyprojects.core.teacher.model.request.TeacherChangeStatusRequest;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.request.TeacherSearchHistoryRequest;
import com.honeyprojects.core.teacher.model.request.TeacherStudentRequest;
import com.honeyprojects.core.teacher.model.response.TeacherAddHoneyHistoryResponse;
import com.honeyprojects.core.teacher.model.response.TeacherCategoryResponse;
import com.honeyprojects.core.teacher.model.response.TeacherPointResponse;
import com.honeyprojects.core.teacher.model.response.TeacherStudentResponse;
import com.honeyprojects.entity.History;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface TeacherAddPointService {

    List<TeacherCategoryResponse> getCategory();

    TeacherStudentResponse getStudent(TeacherStudentRequest studentRequset);

    TeacherPointResponse getPointStudent(TeacherGetPointRequest getPointRequest);

    PageableObject<TeacherAddHoneyHistoryResponse> getHistory(TeacherSearchHistoryRequest historyRequest);

    History changeStatus( TeacherChangeStatusRequest changeStatusRequest);

    History addPoint(TeacherAddPointRequest addPointRequest);
}
