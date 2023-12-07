package com.honeyprojects.core.president.service.impl;

import com.honeyprojects.core.president.repository.PresidentNotificationRepository;
import com.honeyprojects.core.president.service.PresidentNotificationService;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PresidentNotificationServiceImpl implements PresidentNotificationService {

    @Autowired
    private PresidentNotificationRepository presidentNotificationRepository;

    @Override
    public Notification createNotification(String title, String idStudent, NotificationType type) {

        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setStudentId(idStudent);
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setType(NotificationType.PRESIDENT);
        return presidentNotificationRepository.save(notification);
    }

}
