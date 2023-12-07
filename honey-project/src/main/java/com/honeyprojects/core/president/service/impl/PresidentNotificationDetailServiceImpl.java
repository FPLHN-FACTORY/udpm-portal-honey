package com.honeyprojects.core.president.service.impl;

import com.honeyprojects.core.president.model.response.PresidentCategoryResponse;
import com.honeyprojects.core.president.model.response.PresidentGiftResponse;
import com.honeyprojects.core.president.repository.PresidentHistoryDetailRepository;
import com.honeyprojects.core.president.repository.PresidentNotificationDetailRepository;
import com.honeyprojects.core.president.service.PresidentNotificationDetailService;
import com.honeyprojects.core.president.service.PresidentNotificationService;
import com.honeyprojects.entity.NotificationDetail;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PresidentNotificationDetailServiceImpl implements PresidentNotificationDetailService {

    @Autowired
    private PresidentNotificationDetailRepository presidentNotificationDetailRepository;

    @Override
    public NotificationDetail createNotificationDetailHoney(String idNotification, Integer quantity, PresidentCategoryResponse category) {

        String content = Constants.CONTENT_NOTIFICATION_LAB + " Mật ong - " + category.getName() + " - Số lượng: " + quantity;
        NotificationDetail notificationDetail = new NotificationDetail();
        notificationDetail.setContent(content);
        notificationDetail.setIdNotification(idNotification);
        notificationDetail.setIdObject(category.getId());
        notificationDetail.setType(NotificationDetailType.NOTIFICATION_DETAIL_HONEY);
        notificationDetail.setQuantity(quantity);
        return presidentNotificationDetailRepository.save(notificationDetail);
    }

    @Override
    public NotificationDetail createNotificationDetailGift(String idNotification, Integer quantity, PresidentGiftResponse gift) {

        String content = Constants.CONTENT_NOTIFICATION_LAB + "Vật phẩm - " + gift.getName() + " - số lượng: " + quantity;
        NotificationDetail notificationDetail = new NotificationDetail();
        notificationDetail.setContent(content);
        notificationDetail.setIdNotification(idNotification);
        notificationDetail.setIdObject(gift.getId());
        notificationDetail.setType(NotificationDetailType.NOTIFICATION_DETAIL_GIFT);
        notificationDetail.setQuantity(quantity);
        return presidentNotificationDetailRepository.save(notificationDetail);
    }
}
