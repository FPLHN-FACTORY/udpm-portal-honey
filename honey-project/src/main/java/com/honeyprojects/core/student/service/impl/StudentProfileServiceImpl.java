package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.student.model.response.StudentMyHoneyResponse;
import com.honeyprojects.core.student.repository.StudentUserRepository;
import com.honeyprojects.core.student.service.StudentProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentProfileServiceImpl implements StudentProfileService {

    @Autowired
    private UdpmHoney udpmHoney;

    @Autowired
    private StudentUserRepository studentUserRepository;

    @Override
    public List<StudentMyHoneyResponse> getHoneyByUser() {
        String userId = udpmHoney.getIdUser();
        return studentUserRepository.getHoney(userId);
    }
}
