package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.repository.AdNotificationDetailRepository;
import com.honeyprojects.core.admin.service.AdNotificationDetailService;
import com.honeyprojects.entity.NotificationDetail;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdNotificationDetailServiceImpl implements AdNotificationDetailService {

    @Autowired
    private AdNotificationDetailRepository adNotificationDetailRepository;

    @Override
    public NotificationDetail createNotificationDetailHoney(String idNotification, Integer quantity, String honeyName, String honeyId) {

        String content = "Bạn đã nhận được: " + " Mật ong - " + honeyName + " - Số lượng: " + quantity;
        NotificationDetail notificationDetail = new NotificationDetail();
        notificationDetail.setContent(content);
        notificationDetail.setIdNotification(idNotification);
        notificationDetail.setIdObject(honeyId);
        notificationDetail.setType(NotificationDetailType.NOTIFICATION_DETAIL_HONEY);
        notificationDetail.setQuantity(quantity);
        return adNotificationDetailRepository.save(notificationDetail);
    }

    @Override
    public NotificationDetail createNotificationDetailGift(String idNotification, Integer quantity, String nameGift, String idGift) {

        String content = "Bạn đã nhận được: " + "Vật phẩm - " + nameGift + " - số lượng: " + quantity;
        NotificationDetail notificationDetail = new NotificationDetail();
        notificationDetail.setContent(content);
        notificationDetail.setIdNotification(idNotification);
        notificationDetail.setIdObject(idGift);
        notificationDetail.setType(NotificationDetailType.NOTIFICATION_DETAIL_GIFT);
        notificationDetail.setQuantity(quantity);
        return adNotificationDetailRepository.save(notificationDetail);
    }
}
