package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.response.AdNotificationResponse;

import java.util.List;

public interface AdNotificationService {
    List<AdNotificationResponse> getAllNotifications();

    Integer getNumberNotifications();
}
