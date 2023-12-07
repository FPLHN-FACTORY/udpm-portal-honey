package com.honeyprojects.core.president.service;

import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.NotificationType;

public interface PresidentNotificationService {

    Notification createNotification(String title, String idStudent, NotificationType type);
}
