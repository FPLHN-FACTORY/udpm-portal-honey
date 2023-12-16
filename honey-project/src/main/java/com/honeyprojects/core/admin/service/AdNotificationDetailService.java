package com.honeyprojects.core.admin.service;

import com.honeyprojects.entity.NotificationDetail;

public interface AdNotificationDetailService {

    NotificationDetail createNotificationDetailHoney(String idNotification, Integer quantity, String honeyName, String honeyId);

    NotificationDetail createNotificationDetailGift(String idNotification, Integer quantity, String nameGift, String idGift);
}
