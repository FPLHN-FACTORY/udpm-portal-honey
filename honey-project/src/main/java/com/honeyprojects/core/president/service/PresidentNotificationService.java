package com.honeyprojects.core.president.service;

import com.honeyprojects.core.admin.model.request.AdminNotificationRequest;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;

public interface PresidentNotificationService {

    Notification createNotification(String title, String idStudent, NotificationType type);

    PageableObject<Notification> getAllNotification(AdminNotificationRequest request);

    Integer getNumberNotifications();

    void updateAllStatus();

    Notification updateStatus(String id);

    Notification sendNotificationToAdmin(String idHistoryDetail, String idPresident);
}
