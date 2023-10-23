package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.request.StudentNotificationRequest;
import com.honeyprojects.core.student.model.response.StudentNotificationResponse;
import com.honeyprojects.repository.NotificationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentNotificationRepository extends NotificationRepository {
    @Query(value = """
            SELECT n.id, nd.content, n.status, n.type, n.created_date, n.student_id, n.title
                FROM notification n 
                JOIN notification_detail nd
                ON n.id = nd.id_notification 
                WHERE n.student_id = :usersId 
                AND ( :#{#request.title} IS NULL 
                        OR :#{#request.title} LIKE ''
                    )
                ORDER BY n.created_date DESC
            """, countQuery = """
            SELECT COUNT(*) 
                FROM notification n 
                JOIN notification_detail nd
                ON n.id = nd.id_notification
                WHERE n.student_id = :usersId 
                AND ( :#{#request.title} IS NULL 
                        OR :#{#request.title} LIKE ''
                    )
                ORDER BY n.created_date DESC
                    """, nativeQuery = true)
    Page<StudentNotificationResponse> getAllNotification(Pageable pageable, @Param("usersId") String usersId, @Param("request") StudentNotificationRequest request);

    @Query(value = """
            SELECT count(*) as 'thong_bao' FROM notification n
                WHERE n.student_id = :usersId AND n.status = 0;
            """, nativeQuery = true)
    int countNotification(@Param("usersId") String usersId);
}
