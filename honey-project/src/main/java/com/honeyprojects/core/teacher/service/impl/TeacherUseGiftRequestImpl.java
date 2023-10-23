package com.honeyprojects.core.teacher.service.impl;

import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.teacher.model.request.TeacherGetUseGiftRequest;
import com.honeyprojects.core.teacher.model.response.TeacherUseGiftRequestResponse;
import com.honeyprojects.core.teacher.repository.*;
import com.honeyprojects.core.teacher.service.TeacherUseGiftRequest;
import com.honeyprojects.entity.*;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.util.ConvertRequestApiidentity;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TeacherUseGiftRequestImpl implements TeacherUseGiftRequest {
    @Autowired
    private TeacherUseGiftRequestRepository historyRepository;
    @Autowired
    private TeacherGiftRepository giftRepository;
    @Autowired
    private TeacherArchiveRepository archiveRepository;
    @Autowired
    private TeacherArchiveGiftRepository archiveGiftRepository;
    @Autowired
    private ConvertRequestApiidentity apiidentity;
    @Autowired
    private TeacherNotificationRepository notificationRepository;
    @Autowired
    private UdpmHoney udpmHoney;

    @Override
    public Page<TeacherUseGiftRequestResponse> getTeacherUseGiftRequest(TeacherGetUseGiftRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        request.setIdTeacher(udpmHoney.getIdUser());
        if (request.getEmail() != null) {
            String idStudent = apiidentity.handleCallApiGetUserByEmail(request.getEmail()).getId();
            request.setIdStudent(Objects.requireNonNullElse(idStudent, "idStudent"));
        }
        return historyRepository.getTeacherUseGiftRequest(request,pageable);
    }

    @Override
    public List<String> getFilterClass() {
        return historyRepository.filterClass(HoneyStatus.CHO_PHE_DUYET, TypeHistory.PHE_DUYET_QUA);
    }

    @Override
    @Transactional
    public List<Gift> getFilterGift() {
        List<String> listIdGift = historyRepository.filterGift(HoneyStatus.CHO_PHE_DUYET, TypeHistory.PHE_DUYET_QUA);;
        return listIdGift.stream().map(id -> giftRepository.findById(id).get()).toList();
    }

    @Override
    public History acceptRequest(String id) {
        History history = historyRepository.findById(id).get();
        Gift gift = giftRepository.findById(history.getGiftId()).get();
        history.setStatus(HoneyStatus.DA_PHE_DUYET);
        historyRepository.save(history);
        Notification notification = new Notification();
        notification.setStudentId(history.getStudentId());
        notification.setTitle("Yêu cầu mở quà");
        SimpleResponse teacher = apiidentity.handleCallApiGetUserById(history.getTeacherId());
        StringBuilder content = new StringBuilder("Gói quà [ ");
        notificationRepository.save(notification);
        return history;
    }

    @Override
    @Transactional
    @Async
    public History cancelRequest(String id, String note) {
        History history = historyRepository.findById(id).get();
        Gift gift = giftRepository.findById(history.getGiftId()).get();
        history.setStatus(HoneyStatus.DA_HUY);
        history.setNote(note);
        Archive newArchive = new Archive();
        newArchive.setStudentId(history.getStudentId());
        Archive archive = archiveRepository
                .findAllByStudentId(history.getStudentId()).orElse(newArchive);
        archiveRepository.save(archive);

        ArchiveGift archiveGift = new ArchiveGift();
        archiveGift.setGiftId(history.getGiftId());
        archiveGift.setArchiveId(archive.getId());
        Notification notification = new Notification();
        notification.setStudentId(history.getStudentId());
        notification.setTitle("Yêu cầu mở quà");
        SimpleResponse teacher = apiidentity.handleCallApiGetUserById(history.getTeacherId());
        StringBuilder content = new StringBuilder("Gói quà [ ");
        notificationRepository.save(notification);
        archiveGiftRepository.save(archiveGift);
        historyRepository.save(history);
        return history;
    }

}
