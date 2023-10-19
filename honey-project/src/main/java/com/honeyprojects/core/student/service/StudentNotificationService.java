package com.honeyprojects.core.student.service;


import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.student.model.request.StudentNotificationRequest;
import com.honeyprojects.core.student.model.response.StudentNotificationResponse;
import com.honeyprojects.entity.Notification;

public interface StudentNotificationService {
    PageableObject<StudentNotificationResponse> fillAllNotification(String idStudent, final StudentNotificationRequest request);

    int countNotification(String id);

    Notification updateStatus(String id);

    void updateAllStatus();

    Notification getOne(String id);

    void deleteNotification(String id);
}
