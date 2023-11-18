package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.student.model.request.StudentNotificationRequest;
import com.honeyprojects.core.student.model.response.StudentNotificationResponse;
import com.honeyprojects.core.student.repository.StudentNotificationRepository;
import com.honeyprojects.core.student.service.StudentNotificationService;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StudentNotificationServiceImpl implements StudentNotificationService {

    @Autowired
    private StudentNotificationRepository notificationRepository;

    @Override
    public PageableObject<StudentNotificationResponse> fillAllNotification(String idStudent, StudentNotificationRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<StudentNotificationResponse> res = notificationRepository.getAllNotification(pageable, idStudent, request);
        return new PageableObject<>(res);
    }

    @Override
    public List<StudentNotificationResponse> fillListNotification(String idStudent, StudentNotificationRequest request) {
        return notificationRepository.getListNotification(idStudent, request);
    }

    @Override
    public int countNotification(String id) {
        return notificationRepository.countNotification(id);
    }

    @Override
    @Transactional
    public Boolean updateStatus(String id) {
        Optional<Notification> optionalNotification = notificationRepository.findById(id);
        if (optionalNotification.get().getStatus() == NotificationStatus.CHUA_DOC) {
            optionalNotification.get().setStatus(NotificationStatus.DA_DOC_CHUA_NHAN_QUA);
            notificationRepository.save(optionalNotification.get());
            return true;
        }
        return false;
    }

    @Override
    public Notification getOne(String id) {
        Optional<Notification> optionalNotification = notificationRepository.findById(id);
        return optionalNotification.get();
    }

    @Override
    @Transactional
    public void deleteNotification(String id) {
        Optional<Notification> optionalNotification = notificationRepository.findById(id);
        notificationRepository.delete(optionalNotification.get());
    }
}
