package com.honeyprojects.core.teacher.service.impl;

import com.honeyprojects.core.teacher.model.response.TeacherCategoryResponse;
import com.honeyprojects.core.teacher.repository.TeacherNotificationDetailRepository;
import com.honeyprojects.core.teacher.service.TeacherNotificationDetailService;
import com.honeyprojects.entity.NotificationDetail;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherNotificationDetailServiceImpl implements TeacherNotificationDetailService {

    @Autowired
    private TeacherNotificationDetailRepository teacherNotificationDetailRepository;

    @Override
    public NotificationDetail createNotificationDetailHoney(String idNotification, Integer quantity, TeacherCategoryResponse category) {

        String content = Constants.CONTENT_NOTIFICATION_TEACHER + " Mật ong - " + category.getName() + " - Số lượng: " + quantity;
        NotificationDetail notificationDetail = new NotificationDetail();
        notificationDetail.setContent(content);
        notificationDetail.setIdNotification(idNotification);
        notificationDetail.setIdObject(category.getId());
        notificationDetail.setType(NotificationDetailType.NOTIFICATION_DETAIL_HONEY);
        notificationDetail.setQuantity(quantity);
        return teacherNotificationDetailRepository.save(notificationDetail);
    }

}
