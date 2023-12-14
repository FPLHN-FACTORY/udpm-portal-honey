package com.honeyprojects.core.teacher.service;

import com.honeyprojects.core.admin.model.request.AdminNotificationRequest;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.NotificationType;

public interface TeacherNotificationService {

    Notification createNotification(String title, String idStudent, NotificationType type);

    PageableObject<Notification> getAllNotification(AdminNotificationRequest request);

    Integer getNumberNotifications();

    void updateAllStatus();

    Notification updateStatus(String id);
}
