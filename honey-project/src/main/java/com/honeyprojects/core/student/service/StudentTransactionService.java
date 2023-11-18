package com.honeyprojects.core.student.service;

import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.model.request.StudentTransactionRequest;
import com.honeyprojects.core.student.model.response.StudentCategoryResponse;
import com.honeyprojects.core.student.model.response.StudentGiftTransactionResponse;
import com.honeyprojects.core.student.model.response.StudentHoneyResponse;
import com.honeyprojects.core.student.model.response.TransactionResponse;

import java.util.List;

public interface StudentTransactionService {

    List<StudentCategoryResponse> getCategory();

    StudentHoneyResponse getHoney(String categoryId);


    String searchUser(String username);
    SimpleResponse getUserById(String id);

    String getUserLogin();

    TransactionResponse sendTransaction(StudentTransactionRequest request);

    List<StudentGiftTransactionResponse> getGiftTransactions();
}
