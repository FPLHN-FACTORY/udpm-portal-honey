package com.honeyprojects.core.president.service.impl;

import com.honeyprojects.core.admin.model.request.AdminNotificationRequest;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.president.repository.PresidentNotificationRepository;
import com.honeyprojects.core.president.service.PresidentNotificationService;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import com.honeyprojects.util.DataUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class PresidentNotificationServiceImpl implements PresidentNotificationService {

    @Autowired
    private UdpmHoney udpmHoney;

    @Autowired
    private PresidentNotificationRepository presidentNotificationRepository;

    @Override
    public Notification createNotification(String title, String idStudent, NotificationType type) {

        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setStudentId(idStudent);
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setType(NotificationType.ADMIN_CHO_PHE_DUYET);
        return presidentNotificationRepository.save(notification);
    }

    @Override
    public PageableObject<Notification> getAllNotification(AdminNotificationRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Notification> res = presidentNotificationRepository.getAllNotification(pageable, udpmHoney.getIdUser());
        return new PageableObject<>(res);
    }

    @Override
    public Integer getNumberNotifications() {
        return presidentNotificationRepository.getNumberNotifications(udpmHoney.getIdUser());
    }

    @Override
    @Transactional
    public void updateAllStatus() {
        List<Notification> notifications = presidentNotificationRepository.findByTypeInAndStatusAndPresidentId(Arrays.asList(3, 4),
                NotificationStatus.CHUA_DOC, udpmHoney.getIdUser());
        if (!DataUtils.isNullObject(notifications)) {
            for (Notification notification : notifications) {
                notification.setStatus(NotificationStatus.DA_DOC);
            }
            presidentNotificationRepository.saveAll(notifications);
        }
    }

    @Override
    @Transactional
    public Notification updateStatus(String id) {
        Notification optionalNotification = presidentNotificationRepository.findByIdAndStatusAndPresidentId(
                id, NotificationStatus.CHUA_DOC, udpmHoney.getIdUser());
        if (!DataUtils.isNullObject(optionalNotification)) {
            optionalNotification.setStatus(NotificationStatus.DA_DOC);
            presidentNotificationRepository.save(optionalNotification);
        }
        return optionalNotification;
    }

    @Override
    public Notification sendNotificationToAdmin(String idHistoryDetail, String idPresident) {
        String title = Constants.TITLE_NOTIFICATION_PRESIDENT_TO_ADMIN;
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setIdHistoryDetail(idHistoryDetail);
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setType(NotificationType.ADMIN_CHO_PHE_DUYET);
        notification.setPresidentId(idPresident);
        return presidentNotificationRepository.save(notification);
    }
}
