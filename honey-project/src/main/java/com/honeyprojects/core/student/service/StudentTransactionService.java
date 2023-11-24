package com.honeyprojects.core.student.service;

import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.model.request.transaction.StudentDoneRequest;
import com.honeyprojects.core.student.model.request.transaction.StudentTransactionRequest;
import com.honeyprojects.core.student.model.response.StudentCategoryResponse;
import com.honeyprojects.core.student.model.response.transaction.StudentGiftTransactionResponse;
import com.honeyprojects.core.student.model.response.StudentHoneyResponse;
import com.honeyprojects.core.student.model.response.transaction.TransactionResponse;

import java.util.List;

public interface StudentTransactionService {

    StudentCategoryResponse getCategory();

    StudentHoneyResponse getHoney(String categoryId);


    String searchUser(String username);
    SimpleResponse getUserById(String id);

    String getUserLogin();

    TransactionResponse sendTransaction(StudentTransactionRequest request);

    List<StudentGiftTransactionResponse> getGiftTransactions();

    Boolean transaction(StudentDoneRequest request);
}
