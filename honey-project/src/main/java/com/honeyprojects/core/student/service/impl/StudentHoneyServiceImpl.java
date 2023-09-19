package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.student.model.repuest.StudentHoneyRequest;
import com.honeyprojects.core.student.model.response.StudentHoneyResponse;
import com.honeyprojects.core.student.repository.StudentHoneyRepository;
import com.honeyprojects.core.student.service.StudentHoneyService;
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

}
