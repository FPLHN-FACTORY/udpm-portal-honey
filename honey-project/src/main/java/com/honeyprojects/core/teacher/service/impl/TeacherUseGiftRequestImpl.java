package com.honeyprojects.core.teacher.service.impl;

import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.teacher.model.request.TeacherAcceptAllRequest;
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

import java.util.ArrayList;
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
    @Autowired
    private TeacherNotificationDetailRepository notificationDetailRepository;

    @Override
    public Page<TeacherUseGiftRequestResponse> getTeacherUseGiftRequest(TeacherGetUseGiftRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        request.setIdTeacher(udpmHoney.getIdUser());
        if (request.getEmail() != null) {
            String idStudent = apiidentity.handleCallApiGetUserByEmail(request.getEmail()).getId();
            request.setIdStudent(Objects.requireNonNullElse(idStudent, "idStudent"));
        }
        return historyRepository.getTeacherUseGiftRequest(request, pageable);
    }

    @Override
    public List<String> getFilterClass() {
        return historyRepository.filterClass(HoneyStatus.CHO_PHE_DUYET, TypeHistory.PHE_DUYET_QUA);
    }

    @Override
    @Transactional
    public List<Gift> getFilterGift() {
        List<String> listIdGift = historyRepository.filterGift(HoneyStatus.CHO_PHE_DUYET, TypeHistory.PHE_DUYET_QUA);
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
        notificationRepository.save(notification);

        NotificationDetail notificationDetail = new NotificationDetail();
        notificationDetail.setIdNotification(notification.getId());
        SimpleResponse teacher = apiidentity.handleCallApiGetUserById(history.getTeacherId());
        StringBuilder content = new StringBuilder("Gói quà [ ");
        notificationDetail.setContent(content.append(gift.getName())
                .append((" ] đã được phê duyệt.\n"))
                .append("Lớp: ")
                .append(history.getNameGift())
                .append(" | Giảng viên: ")
                .append(teacher.getName())
                .toString());
        notificationDetailRepository.save(notificationDetail);
        return history;
    }

    @Override
    public List<History> acceptAllRequest(TeacherAcceptAllRequest request) {
        List<History> historyList = new ArrayList<>();
        for (String idHistory : request.getListId()) {
            History history = historyRepository.findById(idHistory).get();
            Gift gift = giftRepository.findById(history.getGiftId()).get();
            history.setStatus(HoneyStatus.DA_PHE_DUYET);
            historyList.add(history);
            historyRepository.saveAll(historyList);

            Notification notification = new Notification();
            notification.setStudentId(history.getStudentId());
            notification.setTitle("Yêu cầu mở quà");
            notificationRepository.save(notification);

            NotificationDetail notificationDetail = new NotificationDetail();
            notificationDetail.setIdNotification(notification.getId());
            SimpleResponse teacher = apiidentity.handleCallApiGetUserById(history.getTeacherId());
            StringBuilder content = new StringBuilder("Gói quà [ ");
            notificationDetail.setContent(content.append(gift.getName())
                    .append((" ] đã được phê duyệt.\n"))
                    .append("Môn: ")
                    .append(history.getSubject())
                    .append("Lớp: ")
                    .append(history.getClassName())
                    .append(" | Giảng viên: ")
                    .append(teacher.getName())
                    .toString());
            notificationDetailRepository.save(notificationDetail);
        }
        return historyList;
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
        notificationRepository.save(notification);

        NotificationDetail notificationDetail = new NotificationDetail();
        notificationDetail.setIdNotification(notification.getId());
        SimpleResponse teacher = apiidentity.handleCallApiGetUserById(history.getTeacherId());
        StringBuilder content = new StringBuilder("Gói quà [ ");
        notificationDetail.setContent(content.append(gift.getName())
                .append((" ] bị từ chối.\n"))
                .append("Môn: ")
                .append(history.getSubject())
                .append("Lớp: ")
                .append(history.getClassName())
                .append(" | Giảng viên: ")
                .append(teacher.getName())
                .append("\n")
                .append("LÝ DO: ")
                .append(note)
                .toString());
        notificationDetailRepository.save(notificationDetail);
        archiveGiftRepository.save(archiveGift);
        historyRepository.save(history);
        return history;
    }

}
