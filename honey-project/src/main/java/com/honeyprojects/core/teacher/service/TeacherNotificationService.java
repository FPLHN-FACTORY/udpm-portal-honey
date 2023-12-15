package com.honeyprojects.core.teacher.service;

import com.honeyprojects.core.admin.model.request.AdminNotificationRequest;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Notification;

public interface TeacherNotificationService {

    PageableObject<Notification> getAllNotification(AdminNotificationRequest request);

    Integer getNumberNotifications();

    void updateAllStatus();

    Notification updateStatus(String id);

    Notification sendNotificationToAdmin(String idHistoryDetail, String name, String idTeacher);

    Notification sendNotificationToStudent(String name, String idTeacher);

}
