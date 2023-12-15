package com.honeyprojects.core.president.repository;

import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.repository.NotificationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PresidentNotificationRepository extends NotificationRepository {
    @Query(value = """
            SELECT * FROM notification n 
                WHERE n.type in (3, 4)
                and n.president = :userId
                ORDER BY n.created_date DESC
            """, countQuery = """
            SELECT COUNT(n.id)
                FROM notification n 
                WHERE n.type in (3, 4)
                and n.president = :userId
                ORDER BY n.created_date DESC
                    """, nativeQuery = true)
    Page<Notification> getAllNotification(Pageable pageable, String userId);

    @Query(value = """
                    SELECT count(*) FROM notification n
                    WHERE n.type in (3, 4)
                    and status = 0
                    and n.president = :userId
            """, nativeQuery = true)
    Integer getNumberNotifications(String userId);

    List<Notification> findByTypeInAndStatusAndPresidentId(List<Integer> lstType, NotificationStatus status, String userId);

    Notification findByIdAndStatusAndPresidentId(String id, NotificationStatus status, String userId);
}
