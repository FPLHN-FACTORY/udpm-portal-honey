package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminNotificationRequest;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Notification;

public interface AdNotificationService {
    PageableObject<Notification> getAllNotification(AdminNotificationRequest request);

    Integer getNumberNotifications();

    void updateAllStatus();

    Notification updateStatus(String id);

    Notification sendNotificationApprovalToStudent(String studentId);

    Notification sendNotificationApprovalToTeacher(String teacherId, String userNameStudent, String historyId);

    Notification sendNotificationApprovalToPresident(String presidentId, String userNameStudent, String historyId);

    Notification teacherSendNotificationToStudent(String studentId, String teacherName);

    Notification presidentSendNotificationToStudent(String studentId, String teacherName);

    Notification sendNotificationRefuseToStudent(String studentId);

    Notification sendNotificationRefuseToTeacher(String teacherId, String userNameStudent, String historyId);

    Notification sendNotificationRefuseToPresident(String presidentId, String userNameStudent, String historyId);

}
