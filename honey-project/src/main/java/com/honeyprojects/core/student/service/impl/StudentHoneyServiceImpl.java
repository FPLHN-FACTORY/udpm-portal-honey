package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.student.model.request.StudentHoneyRequest;
import com.honeyprojects.core.student.model.response.StudentHoneyResponse;
import com.honeyprojects.core.student.repository.StudentHoneyRepository;
import com.honeyprojects.core.student.service.StudentHoneyService;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentHoneyServiceImpl implements StudentHoneyService {

    @Autowired
    private StudentHoneyRepository honeyRepository;

    @Override
    public StudentHoneyResponse getPoint(StudentHoneyRequest honeyRequest) {
        return honeyRepository.getPointHoney(honeyRequest);
    }

    @Override
    public Honey getOneByUserAndCategory(String idUser, String idCategory) {
        Honey honey = honeyRepository.findByStudentIdAndHoneyCategoryId(idUser,idCategory);
        if(honey == null){
            throw new RestApiException("Bạn không có mật ong.");
        }
        return honey;
    }

}
