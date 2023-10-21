package com.honeyprojects.core.student.service;

import com.honeyprojects.core.student.model.response.StudentNotificationDetaiRespone;
import com.honeyprojects.entity.Notification;

import java.util.List;

public interface StudentNotificationDetailService {

    List<StudentNotificationDetaiRespone> getAllNotificationDetailByIdNotification(String idStudent, String idNotification);

    Boolean receivingGiftsFromNotifications(List<String> lstIdNotificationDetail, String idStudent, String id);

    Notification getNotificationById(String id);

    Notification updateStatus(String id);
}
