package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.response.AdNotificationResponse;
import com.honeyprojects.core.admin.repository.AdNotificationRespository;
import com.honeyprojects.core.admin.service.AdNotificationService;
import com.honeyprojects.entity.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdNotificationServiceImpl implements AdNotificationService {

    @Autowired
    private AdNotificationRespository adNotificationRespository;

    @Override
    public List<AdNotificationResponse> getAllNotifications() {
        return adNotificationRespository.getAllNotifications();
    }

    @Override
    public Integer getNumberNotifications() {
        return adNotificationRespository.getNumberNotifications();
    }
}
