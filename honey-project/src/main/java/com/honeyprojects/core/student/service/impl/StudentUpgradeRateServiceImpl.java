package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.student.model.request.StudentArchiveUpgradeRateRequest;
import com.honeyprojects.core.student.model.request.StudentUpdateHoneyArchiveRequest;
import com.honeyprojects.core.student.model.request.StudentUpgradeRateRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveUpgradeRateResponse;
import com.honeyprojects.core.student.model.response.StudentConditionResponse;
import com.honeyprojects.core.student.model.response.StudentUpgradeRateResponse;
import com.honeyprojects.core.student.repository.StudentArchiveGiftRepository;
import com.honeyprojects.core.student.repository.StudentHoneyRepository;
import com.honeyprojects.core.student.repository.StudentUpgradeRateRepository;
import com.honeyprojects.core.student.service.StudentUpgradeRateService;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.entity.UpgradeRate;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class StudentUpgradeRateServiceImpl implements StudentUpgradeRateService {

    @Autowired
    private StudentUpgradeRateRepository studentUpgradeRateRepository;

    @Autowired
    private UdpmHoney udpmHoney;

    @Autowired
    private StudentHoneyRepository honeyRepository;

    @Autowired
    private StudentArchiveGiftRepository archiveGiftRepository;

    @Override
    public List<StudentArchiveUpgradeRateResponse> getArchiveByUser(StudentArchiveUpgradeRateRequest request) {
        String userId = udpmHoney.getIdUser();
        return studentUpgradeRateRepository.getArchiveByUser(request, userId);
    }

    @Override
    public List<StudentUpgradeRateResponse> getUpgradeRate(StudentUpgradeRateRequest request) {
        return studentUpgradeRateRepository.getUpgradeRate(request);
    }

    @Override
    public List<StudentConditionResponse> getListGiftCondition(String id) {
        return studentUpgradeRateRepository.getListGiftCondition(id);
    }

    @Override
    public Boolean updateArchive(StudentUpdateHoneyArchiveRequest request) {
        Optional<UpgradeRate> checkRatio = studentUpgradeRateRepository.findById(request.getIdUpgrade());
        if (checkRatio.isEmpty()) {
            throw new RestApiException("Không tìm thấy loại nâng cấp");
        }
        Random random = new Random();
        Double rate = random.nextDouble();
        Double ratio = checkRatio.get().getRatio() / 100;
        List<StudentConditionResponse> listCondition = studentUpgradeRateRepository.getListGiftCondition(request.getIdUpgrade());
        List<ArchiveGift> listArchive = archiveGiftRepository.findAllByGiftIdIn(request.getIdGift());
        List<ArchiveGift> listArchiveNew = new ArrayList<>();
        if (rate <= ratio && listArchive.size() == listCondition.size()) {
            // update honey
            List<Honey> honey = new ArrayList<>();
            List<Honey> listCategories = honeyRepository.getListIdCategory(udpmHoney.getIdUser());
            for (Honey honeyPoint : listCategories) {
                if (honeyPoint.getHoneyCategoryId().equals(checkRatio.get().getOriginalHoney())) {
                    honeyPoint.setHoneyPoint(honeyPoint.getHoneyPoint() - checkRatio.get().getQuantityOriginalHoney());
                }
                if (honeyPoint.getHoneyCategoryId().equals(checkRatio.get().getDestinationHoney())) {
                    honeyPoint.setHoneyPoint(honeyPoint.getHoneyPoint() + checkRatio.get().getQuantityDestinationHoney());
                }
                honey.add(honeyPoint);
            }
            honeyRepository.saveAll(honey);
            // update quantity archive
            for (ArchiveGift archiveGift : listArchive) {
                if (archiveGift.getQuantity() > 1) {
                    archiveGift.setQuantity(archiveGift.getQuantity() - 1);
                    listArchiveNew.add(archiveGift);
                } else {
                    archiveGiftRepository.delete(archiveGift);
                }
            }
            archiveGiftRepository.saveAll(listArchiveNew);
            return true;
        } else if (rate > ratio && listArchive.size() == listCondition.size()) {
            for (ArchiveGift archiveGift : listArchive) {
                if (archiveGift.getQuantity() > 1) {
                    archiveGift.setQuantity(archiveGift.getQuantity() - 1);
                    listArchiveNew.add(archiveGift);
                } else {
                    archiveGiftRepository.delete(archiveGift);
                }
            }
            archiveGiftRepository.saveAll(listArchiveNew);
            return false;
        }
        else {
            throw new RestApiException("Không đủ điều kiện nâng cấp");
        }
    }

}
