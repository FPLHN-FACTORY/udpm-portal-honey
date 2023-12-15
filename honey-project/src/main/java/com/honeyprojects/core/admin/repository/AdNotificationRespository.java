package com.honeyprojects.core.admin.repository;

import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import com.honeyprojects.repository.NotificationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdNotificationRespository extends NotificationRepository {

    @Query(value = """
            SELECT * FROM notification n 
                WHERE n.type = 0
                ORDER BY n.created_date DESC
            """, countQuery = """
            SELECT COUNT(n.id)
                FROM notification n 
                WHERE n.type = 0
                ORDER BY n.created_date DESC
                    """, nativeQuery = true)
    Page<Notification> getAllNotification(Pageable pageable);

    @Query(value = """
                    SELECT count(*) FROM notification n
                    WHERE n.type = 0 
                    and status = 0
            """, nativeQuery = true)
    Integer getNumberNotifications();

    List<Notification> findByTypeAndStatus(NotificationType type, NotificationStatus status);

    Notification findByIdAndStatus(String id, NotificationStatus status);


}
