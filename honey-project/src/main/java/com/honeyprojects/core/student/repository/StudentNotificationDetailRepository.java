package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.response.StudentNotificationDetaiRespone;
import com.honeyprojects.repository.NotificationDetailRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentNotificationDetailRepository extends NotificationDetailRepository {
    @Query(value = """
            SELECT row_number()  OVER(ORDER BY nd.created_date DESC) as stt, nd.id as idNotificationDetail, nd.id_object as idObject, MAX(nd.content) AS content, nd.quantity as quantity
            FROM notification n
            JOIN notification_detail nd on n.id = nd.id_notification
            WHERE n.student_id = :#{#idStu} and n.id = :#{#idNotification}
            GROUP BY n.id, nd.id
            """, countQuery = """
            SELECT  COUNT(DISTINCT nd.id)FROM notification n
                        JOIN notification_detail nd on n.id = nd.id_notification
                        WHERE n.student_id = :#{#idStu} and n.id = :#{#idNotification}
                        GROUP BY n.id, nd.id;
            """, nativeQuery = true)
    List<StudentNotificationDetaiRespone> getAllNotificationDetialByIdNotification(@Param("idStu") String idStudent, @Param("idNotification") String idNotification);
}
