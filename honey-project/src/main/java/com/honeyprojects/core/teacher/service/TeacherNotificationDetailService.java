package com.honeyprojects.core.teacher.service;

import com.honeyprojects.core.teacher.model.response.TeacherCategoryResponse;
import com.honeyprojects.entity.NotificationDetail;

public interface TeacherNotificationDetailService {

    NotificationDetail createNotificationDetailHoney(String idNotification, Integer quantity, TeacherCategoryResponse category);

}
