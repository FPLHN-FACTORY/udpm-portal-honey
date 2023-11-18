package com.honeyprojects.core.student.service;

import com.honeyprojects.core.student.model.request.StudentArchiveUpgradeRateRequest;
import com.honeyprojects.core.student.model.request.StudentUpdateHoneyArchiveRequest;
import com.honeyprojects.core.student.model.request.StudentUpgradeRateRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveUpgradeRateResponse;
import com.honeyprojects.core.student.model.response.StudentConditionResponse;
import com.honeyprojects.core.student.model.response.StudentUpgradeRateResponse;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Gift;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentUpgradeRateService {

    List<StudentArchiveUpgradeRateResponse>getArchiveByUser(StudentArchiveUpgradeRateRequest request);

    List<StudentUpgradeRateResponse>getUpgradeRate(StudentUpgradeRateRequest request);

    List<StudentConditionResponse>getListGiftCondition(String id);

    Boolean updateArchive(StudentUpdateHoneyArchiveRequest request);

}
