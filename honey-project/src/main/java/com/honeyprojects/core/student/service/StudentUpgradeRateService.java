package com.honeyprojects.core.student.service;

import com.honeyprojects.core.student.model.request.StudentArchiveUpgradeRateRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveUpgradeRateResponse;

import java.util.List;

public interface StudentUpgradeRateService {

    List<StudentArchiveUpgradeRateResponse>getArchiveByUser(StudentArchiveUpgradeRateRequest request);

}
