package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.student.model.response.StudentUserApiResponse;
import com.honeyprojects.core.student.repository.StudentUserApiRepository;
import com.honeyprojects.core.student.service.StudentUserApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentUserApiServiceImpl implements StudentUserApiService {

    @Autowired
    private StudentUserApiRepository studentUserApiRepository;

    @Override
    public List<StudentUserApiResponse> getUserApi() {
        return studentUserApiRepository.getUserAPI();
    }


}
