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
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.util.AddPointUtils;
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

    @Autowired
    private AddPointUtils addPointUtils;

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
//        List<StudentConditionResponse> listCondition = studentUpgradeRateRepository.getListGiftCondition(request.getIdUpgrade());
        List<ArchiveGift> listArchive = archiveGiftRepository.findAllByGiftIdIn(request.getIdGift(), udpmHoney.getIdUser());
        List<ArchiveGift> listArchiveNew = new ArrayList<>();

        if (rate <= ratio && listArchive.size() == request.getIdGift().size()) {

            // update honey
            Optional<Honey> honeyPoint = honeyRepository.findByHoneyCategoryIdAndStudentId(checkRatio.get().getOriginalHoney(), udpmHoney.getIdUser());
            if (honeyPoint.isEmpty()) {
                throw new RestApiException("Bạn không đủ mật ong để nâng cấp");
            }

//            for (Honey honeyPoint : listCategories) {
            if (honeyPoint.get().getHoneyPoint() >= request.getOriginalHoney()) {
                honeyPoint.get().setHoneyPoint(honeyPoint.get().getHoneyPoint() - request.getOriginalHoney());
                if (honeyPoint.get().getHoneyPoint() - request.getOriginalHoney() == 0) {
                    honeyRepository.deleteById(honeyPoint.get().getId());
                } else {
                    honeyRepository.save(honeyPoint.get());
                }
            } else {
                throw new RestApiException("Bạn không đủ mật ong để nâng cấp");
            }
//        }

            Optional<Honey> honeyPointDestination = honeyRepository.findByHoneyCategoryIdAndStudentId(checkRatio.get().getDestinationHoney(), udpmHoney.getIdUser());
            if (honeyPointDestination.isEmpty()) {
                // Tạo một đối tượng Honey mới và thêm vào danh sách
                Honey newHoney = new Honey();
                newHoney.setHoneyCategoryId(checkRatio.get().getDestinationHoney());
                newHoney.setHoneyPoint(request.getDestinationHoney());
                newHoney.setStudentId(udpmHoney.getIdUser());
                newHoney.setStatus(Status.HOAT_DONG);
                honeyRepository.save(newHoney);
            } else {
                honeyPointDestination.get().setHoneyPoint(honeyPointDestination.get().getHoneyPoint() + request.getDestinationHoney());
                honeyRepository.save(honeyPointDestination.get());
            }
//            honey.add(honeyPoint.get());
//        }
            // update quantity archive
            for (ArchiveGift archiveGift : listArchive) {
                if (archiveGift.getQuantity() > 1) {
                    archiveGift.setQuantity(archiveGift.getQuantity() - request.getQuantity());
                    listArchiveNew.add(archiveGift);
                } else {
                    archiveGiftRepository.delete(archiveGift);
                }
            }
            archiveGiftRepository.saveAll(listArchiveNew);
            return true;
        } else if (rate > ratio && listArchive.size() == request.getIdGift().size()) {
            for (ArchiveGift archiveGift : listArchive) {
                if (archiveGift.getQuantity() > 1) {
                    archiveGift.setQuantity(archiveGift.getQuantity() - request.getQuantity());
                    listArchiveNew.add(archiveGift);
                } else {
                    archiveGiftRepository.delete(archiveGift);
                }
            }
            archiveGiftRepository.saveAll(listArchiveNew);
            return false;
        } else {
            throw new RestApiException("Không đủ điều kiện nâng cấp");
        }
    }

}
