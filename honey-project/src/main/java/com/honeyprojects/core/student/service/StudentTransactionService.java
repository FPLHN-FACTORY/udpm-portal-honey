package com.honeyprojects.core.student.service;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.student.model.request.StudentChangeStatusHistoryRequest;
import com.honeyprojects.core.student.model.request.StudentSearchHistoryRequest;
import com.honeyprojects.core.student.model.request.StudentTransactionRequest;
import com.honeyprojects.core.student.model.response.StudentCategoryResponse;
import com.honeyprojects.core.student.model.response.StudentHistoryResponse;
import com.honeyprojects.core.student.model.response.StudentHoneyResponse;
import com.honeyprojects.core.teacher.model.request.TeacherChangeStatusRequest;
import com.honeyprojects.entity.History;

import java.util.List;

public interface StudentTransactionService {

    List<StudentCategoryResponse> getCategory(String recipientId);

    StudentHoneyResponse getHoney(String categoryId);

    String genCodeVerify();

    Boolean checkVerify(String code);

    History trasaction(StudentTransactionRequest transactionRequest);

    History changeStatus( StudentChangeStatusHistoryRequest changeStatusRequest);

    PageableObject<StudentHistoryResponse> getHistory(StudentSearchHistoryRequest historyRequest);
}
