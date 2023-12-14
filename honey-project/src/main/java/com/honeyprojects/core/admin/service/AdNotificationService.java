package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminNotificationRequest;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Notification;

public interface AdNotificationService {
    PageableObject<Notification> getAllNotification(AdminNotificationRequest request);

    Integer getNumberNotifications();

    void updateAllStatus();

    Notification updateStatus(String id);
}
