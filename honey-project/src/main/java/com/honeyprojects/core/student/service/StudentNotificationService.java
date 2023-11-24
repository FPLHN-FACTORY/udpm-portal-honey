package com.honeyprojects.core.student.service;


import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.student.model.request.StudentNotificationRequest;
import com.honeyprojects.core.student.model.response.StudentNotificationResponse;
import com.honeyprojects.entity.Notification;

import java.util.List;

public interface StudentNotificationService {

    PageableObject<StudentNotificationResponse> fillAllNotification(String idStudent, final StudentNotificationRequest request);

    List<StudentNotificationResponse> fillListNotification(String idStudent, final StudentNotificationRequest request);

    int countNotification(String id);

    Boolean updateStatus(String id);

    Notification getOne(String id);

    void deleteNotification(String id);

    Boolean updateNotification(String id);
}
