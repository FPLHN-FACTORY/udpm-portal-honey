package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.model.request.StudentTransactionRequest;
import com.honeyprojects.core.student.model.response.StudentCategoryResponse;
import com.honeyprojects.core.student.model.response.StudentGiftTransactionResponse;
import com.honeyprojects.core.student.model.response.StudentHoneyResponse;
import com.honeyprojects.core.student.model.response.TransactionResponse;
import com.honeyprojects.core.student.repository.StudentCategoryRepository;
import com.honeyprojects.core.student.repository.StudentGiftTransactionRepository;
import com.honeyprojects.core.student.repository.StudentHoneyRepository;
import com.honeyprojects.core.student.service.StudentTransactionService;
import com.honeyprojects.infrastructure.configws.WebSocketSessionManager;
import com.honeyprojects.infrastructure.contant.Message;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;
import java.util.Objects;


@Service
public class StudentTransactionServiceImpl implements StudentTransactionService {

    @Autowired
    private StudentCategoryRepository categoryRepository;
    @Autowired
    private StudentHoneyRepository honeyRepository;
    @Autowired
    private UdpmHoney udpmHoney;
    @Autowired
    private StudentGiftTransactionRepository giftRepository;
    @Autowired
    private ConvertRequestApiidentity requestApiidentity;

    @Override
    public List<StudentCategoryResponse> getCategory() {
        return categoryRepository.getCategoryByIdUser(udpmHoney.getIdUser());
    }

    @Override
    public StudentHoneyResponse getHoney(String categoryId) {
        return honeyRepository.getPoint(categoryId, udpmHoney.getIdUser());
    }

    @Override
    public String searchUser(String email) {
        SimpleResponse simpleResponse = requestApiidentity.handleCallApiGetUserByEmail(email);
        if (simpleResponse != null) {
            if (udpmHoney.getIdUser().equals(simpleResponse.getId())) {
                throw new RestApiException("Không thể giao dịch với bản thân!");
            }
            return simpleResponse.getId();
        } else {
            throw new RestApiException("Email sinh viên không tồn tại!");
        }
    }

    @Override
    public SimpleResponse getUserById(String id) {
        return requestApiidentity.handleCallApiGetUserById(id);
    }

    @Override
    public String getUserLogin() {
        return udpmHoney.getIdUser();
    }

    @Override
    public TransactionResponse sendTransaction(StudentTransactionRequest request) {
        try {
            return new TransactionResponse(request.getIdTransaction(), request.getNameUser());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<StudentGiftTransactionResponse> getGiftTransactions() {
        return giftRepository.getGiftTransaction(udpmHoney.getIdUser());
    }
}
