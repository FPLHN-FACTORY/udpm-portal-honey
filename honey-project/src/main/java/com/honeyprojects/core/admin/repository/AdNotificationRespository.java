package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.response.AdNotificationResponse;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.repository.NotificationRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdNotificationRespository extends NotificationRepository {

    @Query(value = """
        SELECT n.id, n.title, n.created_date, n.status, n.type, n.student_id FROM notification n
        WHERE n.type = 0
""", nativeQuery = true)
    List<AdNotificationResponse> getAllNotifications();

    @Query(value = """
        SELECT count(*) FROM notification n
        WHERE n.type = 0
""", nativeQuery = true)
    Integer getNumberNotifications();

}
