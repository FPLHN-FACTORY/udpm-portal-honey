package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.model.request.*;
import com.honeyprojects.core.student.model.response.StudentArchiveGetChestResponse;
import com.honeyprojects.core.student.model.response.StudentArchiveResponse;
import com.honeyprojects.core.student.model.response.StudentGetListGiftResponse;
import com.honeyprojects.core.student.model.response.archive.StudentArchiveByUserResponse;
import com.honeyprojects.core.student.repository.StudentArchiveRepository;
import com.honeyprojects.core.student.repository.StudentGiftArchiveRepository;
import com.honeyprojects.core.student.repository.StudentHistoryRepository;
import com.honeyprojects.core.student.service.StudentArchiveService;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.History;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.repository.ArchiveGiftRepository;
import com.honeyprojects.util.ConvertRequestApiidentity;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    private ConvertRequestApiidentity requestApiidentity;


    @Override
    public PageableObject<StudentArchiveResponse> getAllGiftArchive(StudentArchiveFilterRequest filterRequest) {
        Pageable pageable = PageRequest.of(filterRequest.getPage(), filterRequest.getSize());
        filterRequest.setIdStudent(udpmHoney.getIdUser());
        System.out.println("--------------------");
        System.out.println(udpmHoney.getIdUser());
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
        SimpleResponse teacher = requestApiidentity.handleCallApiGetUserByEmail(request.getEmailGV());
        if (teacher == null) {
            throw new RestApiException("Email giảng viên không tồn tại");
        }
        ArchiveGift archiveGift = archiveGiftRepository.findById(request.getArchiveGiftId()).orElse(null);
        if (archiveGift != null) {
            History history = new History();
            history.setStudentId(udpmHoney.getIdUser());
            history.setTeacherId(teacher.getId());
            history.setNameGift(request.getMaLop());
            history.setType(TypeHistory.PHE_DUYET_QUA);
            history.setStatus(HoneyStatus.CHO_PHE_DUYET);
            history.setGiftId(archiveGift.getGiftId());
            historyRepository.save(history);
            studentGiftArchiveRepository.delete(archiveGift);
            return archiveGift;
        }
        return null;
    }

    @Override
    public List<ArchiveGift> openChest(StudentArchiveOpenChestRequest request) {
        List<String> listGiftId = studentGiftArchiveRepository.listGiftId(request);
        Optional<Archive> archive = archiveRepository.findByStudentId(udpmHoney.getIdUser());
        List<ArchiveGift> archiveGiftList = new ArrayList<>();
        for (String giftId : listGiftId) {
            ArchiveGift archiveGift = new ArchiveGift();
            archiveGift.setGiftId(giftId);
            archiveGift.setArchiveId(archive.get().getId());
            archiveGift.setChestId(null);
            archiveGiftList.add(archiveGift);
        }
        studentGiftArchiveRepository.saveAll(archiveGiftList);
        return archiveGiftList;
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
    public List<StudentArchiveByUserResponse> findArchiveByUser(String idUser , String idCategory) {
        return archiveRepository.findArchiveByUser(idUser , idCategory);
    }

}
