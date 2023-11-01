package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.student.model.request.StudentArchiveUpgradeRateRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveUpgradeRateResponse;
import com.honeyprojects.core.student.repository.StudentUpgradeRateRepository;
import com.honeyprojects.core.student.service.StudentUpgradeRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentUpgradeRateServiceImpl implements StudentUpgradeRateService {

    @Autowired
    private StudentUpgradeRateRepository studentUpgradeRateRepository;

    @Autowired
    private UdpmHoney udpmHoney;

    @Override
    public List<StudentArchiveUpgradeRateResponse> getArchiveByUser(StudentArchiveUpgradeRateRequest request) {
        String userId = udpmHoney.getIdUser();
        return studentUpgradeRateRepository.getArchiveByUser(request, userId);
    }

}
