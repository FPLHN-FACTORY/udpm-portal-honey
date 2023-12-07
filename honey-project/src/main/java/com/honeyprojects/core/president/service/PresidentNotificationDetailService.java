package com.honeyprojects.core.president.service;

import com.honeyprojects.core.president.model.response.PresidentCategoryResponse;
import com.honeyprojects.core.president.model.response.PresidentGiftResponse;
import com.honeyprojects.entity.NotificationDetail;

public interface PresidentNotificationDetailService {

    NotificationDetail createNotificationDetailHoney(String idNotification, Integer quantity, PresidentCategoryResponse category);

    NotificationDetail createNotificationDetailGift(String idNotification, Integer quantity, PresidentGiftResponse category);
}
