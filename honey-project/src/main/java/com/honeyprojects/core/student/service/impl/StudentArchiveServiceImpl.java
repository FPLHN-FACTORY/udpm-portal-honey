package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.model.param.StudentSumHistoryParam;
import com.honeyprojects.core.student.model.request.StudentArchiveFilterRequest;
import com.honeyprojects.core.student.model.request.StudentArchiveOpenChestRequest;
import com.honeyprojects.core.student.model.request.StudentGetArchiveChestRequest;
import com.honeyprojects.core.student.model.request.StudentGetArchiveGiftRequest;
import com.honeyprojects.core.student.model.request.StudentRequestChangeGift;
import com.honeyprojects.core.student.model.response.StudentArchiveGetChestResponse;
import com.honeyprojects.core.student.model.response.StudentArchiveResponse;
import com.honeyprojects.core.student.model.response.StudentGetListGiftResponse;
import com.honeyprojects.core.student.model.response.archive.StudentArchiveByUserResponse;
import com.honeyprojects.core.student.repository.StudentArchiveRepository;
import com.honeyprojects.core.student.repository.StudentGiftArchiveRepository;
import com.honeyprojects.core.student.repository.StudentGiftRepository;
import com.honeyprojects.core.student.repository.StudentHistoryRepository;
import com.honeyprojects.core.student.service.StudentArchiveService;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.History;
import com.honeyprojects.infrastructure.contant.ExpiryGift;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.SemesterStatus;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.repository.ArchiveGiftRepository;
import com.honeyprojects.util.ConvertRequestApiidentity;
import com.honeyprojects.util.callApiPoint.model.request.FilterScoreTemplateVM;
import com.honeyprojects.util.callApiPoint.model.response.ScoreTemplateVM;
import com.honeyprojects.util.callApiPoint.service.CallApiCommonService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class StudentArchiveServiceImpl implements StudentArchiveService {

    @Autowired
    private StudentGiftArchiveRepository studentGiftArchiveRepository;

    @Autowired
    private UdpmHoney udpmHoney;

    @Autowired
    private StudentArchiveRepository archiveRepository;

    @Autowired
    private ArchiveGiftRepository archiveGiftRepository;

    @Autowired
    private StudentHistoryRepository historyRepository;

    @Autowired
    private StudentGiftRepository giftRepository;

    @Autowired
    private ConvertRequestApiidentity requestApiidentity;

    @Autowired
    private CallApiCommonService callApiCommonService;

    @Override
    public PageableObject<StudentArchiveResponse> getAllGiftArchive(StudentArchiveFilterRequest filterRequest) {
        System.err.println("--------------------------");
        System.err.println(udpmHoney.getIdUser());
        System.err.println("--------------------------");
        Pageable pageable = PageRequest.of(filterRequest.getPage(), filterRequest.getSize());
        filterRequest.setIdStudent(udpmHoney.getIdUser());
        return new PageableObject<>(studentGiftArchiveRepository.getAllGiftArchive(filterRequest, pageable));
    }

    @Override
    public PageableObject<StudentGetListGiftResponse> getListGift(StudentArchiveFilterRequest filterRequest) {
        Pageable pageable = PageRequest.of(filterRequest.getPage(), filterRequest.getSize());
        filterRequest.setIdStudent(udpmHoney.getIdUser());
        return new PageableObject<>(studentGiftArchiveRepository.getListGift(filterRequest, pageable));
    }

    @Override
    @Transactional
    public ArchiveGift studentUsingGift(StudentRequestChangeGift request) {
        SimpleResponse teacher = requestApiidentity.handleCallApiGetUserByEmail("huynqph26782@fpt.edu.vn");
        if (teacher == null) {
            throw new RestApiException("Email giảng viên không tồn tại trong hệ thống!");
        }
        ArchiveGift archiveGift = archiveGiftRepository.findById(request.getArchiveGiftId()).orElse(null);
        Gift gift = giftRepository.findById(archiveGift.getGiftId()).get();
        if (gift.getExpiry().equals(ExpiryGift.HET_HAN) || gift.getExpiry().equals(ExpiryGift.CHUA_HOAT_DONG)) {
            return null;
        }
        if (archiveGift != null) {
            FilterScoreTemplateVM filterScoreTemplate = new FilterScoreTemplateVM();
            filterScoreTemplate.setScoreTemplateId(request.getScoreId());
            filterScoreTemplate.setStudentName(udpmHoney.getUserName());
            ScoreTemplateVM scoreTemplateVM = callApiCommonService.callApiScoreTemplateVM(filterScoreTemplate).get(0);

            if (gift.getScoreRatioMin() != null) {
                if (scoreTemplateVM.getScoreRatio() < gift.getScoreRatioMin()) {
                    throw new RestApiException("Đầu điểm " + scoreTemplateVM.getName() + " không đủ điều kiện.");
                }
            }

            if (gift.getScoreRatioMax() != null) {
                if (scoreTemplateVM.getScoreRatio() > gift.getScoreRatioMax()) {
                    throw new RestApiException("Đầu điểm " + scoreTemplateVM.getName() + " không đủ điều kiện.");
                }
            }

            Double scoreGift = 0.0;
            if (scoreTemplateVM.getScoreRatio() == 0) {
                throw new RestApiException("Đầu điểm " + scoreTemplateVM.getName() + " không đủ điều kiện.");
            }

            scoreGift = request.getQuantity() * ((gift.getScore() * gift.getScoreRatio())/scoreTemplateVM.getScoreRatio());
            if (scoreTemplateVM.getScore() + scoreGift > 10) {
                throw new RestApiException("Đầu điểm " + scoreTemplateVM.getName() + " đã đủ không thể đổi.");
            }
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("Sinh viên '")
                    .append(udpmHoney.getUserName())
                    .append("' đã gửi yêu cầu cộng '")
                    .append(scoreGift)
                    .append("' Điểm cho đầu điểm '")
                    .append(scoreTemplateVM.getName())
                    .append("'")
            ;
            History history = new History();
            history.setStudentId(udpmHoney.getIdUser());
            history.setTeacherId(teacher.getId());
            history.setClassName(request.getMaLop());
            history.setSubject(request.getMaMon());
            history.setType(TypeHistory.PHE_DUYET_QUA);
            history.setStatus(HoneyStatus.CHO_PHE_DUYET);
            history.setNote(stringBuilder.toString());
            historyRepository.save(history);
            archiveGift.setQuantity(archiveGift.getQuantity() - request.getQuantity());
            if (archiveGift.getQuantity() <= 0) {
                archiveGiftRepository.delete(archiveGift);
            } else {
                archiveGiftRepository.save(archiveGift);
            }
            return archiveGift;
        }
        return null;
    }

    @Override
    public Gift openChest(StudentArchiveOpenChestRequest request) {
        Random random = new Random();
        List<String> listGiftId = studentGiftArchiveRepository.listGiftId(request);
        int indexRandom = random.nextInt(listGiftId.size());
        String idRandom = listGiftId.get(indexRandom);
        Gift giftRandom = giftRepository.findById(idRandom).get();

        Optional<Archive> archive = archiveRepository.findByStudentId(udpmHoney.getIdUser());
        Optional<ArchiveGift> existingArchiveGift = studentGiftArchiveRepository.findByGiftId(idRandom);
        if (existingArchiveGift.isPresent()) {
            ArchiveGift archiveGiftExist = existingArchiveGift.get();
            archiveGiftExist.setQuantity(archiveGiftExist.getQuantity() + 1);
            archiveGiftExist.setChestId(null);
            studentGiftArchiveRepository.save(archiveGiftExist);
        } else {
            ArchiveGift archiveGift = new ArchiveGift();
            archiveGift.setGiftId(idRandom);
            archiveGift.setArchiveId(archive.get().getId());
            archiveGift.setQuantity(1);
            archiveGift.setChestId(null);
            studentGiftArchiveRepository.save(archiveGift);
        }
        return giftRandom;
    }

    @Override
    public PageableObject<StudentArchiveGetChestResponse> getChestToArchive(StudentArchiveFilterRequest filterRequest) {
        Pageable pageable = PageRequest.of(filterRequest.getPage(), filterRequest.getSize());
        filterRequest.setIdStudent(udpmHoney.getIdUser());
        return new PageableObject<>(studentGiftArchiveRepository.getChestArchive(filterRequest, pageable));
    }

    @Override
    public ArchiveGift updateArchiveGift(String id) {
        ArchiveGift archiveGift = archiveGiftRepository.findById(id).get();
        archiveGift.setChestId(null);
        archiveGiftRepository.save(archiveGift);
        return archiveGift;
    }

    @Override
    public ArchiveGift getArchiveGift(String id) {
        Optional<ArchiveGift> archiveGift = archiveGiftRepository.findById(id);
        return archiveGift.get();
    }

    @Override
    public StudentArchiveResponse detailArchiveGift(StudentGetArchiveGiftRequest request) {
        request.setIdStudent(udpmHoney.getIdUser());
        return studentGiftArchiveRepository.detailArchiveGift(request);
    }

    @Override
    public StudentArchiveGetChestResponse detailArchiveChest(StudentGetArchiveChestRequest request) {
        request.setIdStudent(udpmHoney.getIdUser());
        return studentGiftArchiveRepository.detailArchiveChest(request);
    }

    @Override
    public List<StudentArchiveByUserResponse> findArchiveByUser(String idUser) {
        return archiveRepository.findArchiveByUser(idUser);
    }

    @Override
    public ArchiveGift deleteItem(String id, StudentGetArchiveGiftRequest request) {
        Optional<ArchiveGift> optional = archiveGiftRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException("Không tìm thấy vật phẩm");
        }
        ArchiveGift archiveGift = optional.get();
        if (archiveGift.getQuantity() - request.getQuantity() > 0) {
            archiveGift.setQuantity(archiveGift.getQuantity() - request.getQuantity());
            archiveGiftRepository.save(archiveGift);
        } else {
            archiveGiftRepository.delete(archiveGift);
        }
        return archiveGift;
    }

}
