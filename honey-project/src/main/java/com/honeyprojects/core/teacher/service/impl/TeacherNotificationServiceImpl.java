package com.honeyprojects.core.teacher.service.impl;

import com.honeyprojects.core.admin.model.request.AdminNotificationRequest;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.teacher.repository.TeacherNotificationRepository;
import com.honeyprojects.core.teacher.service.TeacherNotificationService;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import com.honeyprojects.util.DataUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class TeacherNotificationServiceImpl implements TeacherNotificationService {

    @Autowired
    private UdpmHoney udpmHoney;

    @Autowired
    private TeacherNotificationRepository teacherNotificationRepository;

    @Override
    public PageableObject<Notification> getAllNotification(AdminNotificationRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Notification> res = teacherNotificationRepository.getAllNotification(pageable, udpmHoney.getIdUser());
        return new PageableObject<>(res);
    }

    @Override
    public Integer getNumberNotifications() {
        return teacherNotificationRepository.getNumberNotifications(udpmHoney.getIdUser());
    }

    @Override
    @Transactional
    public void updateAllStatus() {
        List<Notification> notifications = teacherNotificationRepository.findByTypeInAndStatusAndTeacherId(Arrays.asList(1, 2, 6),
                NotificationStatus.CHUA_DOC, udpmHoney.getIdUser());
        if (!DataUtils.isNullObject(notifications)) {
            for (Notification notification : notifications) {
                notification.setStatus(NotificationStatus.DA_DOC);
            }
            teacherNotificationRepository.saveAll(notifications);
        }
    }

    @Override
    @Transactional
    public Notification updateStatus(String id) {
        Notification optionalNotification = teacherNotificationRepository.findByIdAndStatusAndTeacherId(
                id, NotificationStatus.CHUA_DOC, udpmHoney.getIdUser());
        if (!DataUtils.isNullObject(optionalNotification)) {
            optionalNotification.setStatus(NotificationStatus.DA_DOC);
            teacherNotificationRepository.save(optionalNotification);
        }
        return optionalNotification;
    }

    @Override
    public Notification sendNotificationToAdmin(String idHistoryDetail, String name, String idTeacher) {
        String title = "Giảng viên " + name + Constants.TITLE_NOTIFICATION_TEACHER_TO_ADMIN;
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setIdHistoryDetail(idHistoryDetail);
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setType(NotificationType.ADMIN_CHO_PHE_DUYET);
        notification.setTeacherId(idTeacher);
        return teacherNotificationRepository.save(notification);
    }

    @Override
    public Notification sendNotificationToStudent(String name, String idUser) {
        String title = Constants.TITLE_NOTIFICATION_TEACHER + " - " + name;
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setType(NotificationType.HE_THONG);
        notification.setStudentId(idUser);
        return teacherNotificationRepository.save(notification);
    }
}
