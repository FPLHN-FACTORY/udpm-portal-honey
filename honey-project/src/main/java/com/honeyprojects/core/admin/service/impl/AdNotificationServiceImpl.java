package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminNotificationRequest;
import com.honeyprojects.core.admin.repository.AdNotificationRespository;
import com.honeyprojects.core.admin.service.AdNotificationService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import com.honeyprojects.util.DataUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdNotificationServiceImpl implements AdNotificationService {

    @Autowired
    private AdNotificationRespository adNotificationRespository;

    @Override
    public PageableObject<Notification> getAllNotification(AdminNotificationRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Notification> res = adNotificationRespository.getAllNotification(pageable);
        return new PageableObject<>(res);
    }

    @Override
    public Integer getNumberNotifications() {
        return adNotificationRespository.getNumberNotifications();
    }

    @Override
    @Transactional
    public void updateAllStatus() {
        List<Notification> notifications = adNotificationRespository.findByTypeAndStatus(NotificationType.ADMIN_CHO_PHE_DUYET,
                NotificationStatus.CHUA_DOC);
        if (!DataUtils.isNullObject(notifications)) {
            for (Notification notification : notifications) {
                notification.setStatus(NotificationStatus.DA_DOC);
            }
            adNotificationRespository.saveAll(notifications);
        }
    }

    @Override
    @Transactional
    public Notification updateStatus(String id) {
        Notification optionalNotification = adNotificationRespository.findByIdAndStatus(id, NotificationStatus.CHUA_DOC);
        if (!DataUtils.isNullObject(optionalNotification)) {
            optionalNotification.setStatus(NotificationStatus.DA_DOC);
            adNotificationRespository.save(optionalNotification);
        }
        return optionalNotification;
    }
}
