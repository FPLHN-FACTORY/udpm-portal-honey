package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import org.springframework.beans.factory.annotation.Value;

public interface StudentNotificationResponse extends IsIdentified {

    @Value("#{target.student_id}")
    String getStudentId();

    @Value("#{target.title}")
    String getTitle();

//    @Value("#{target.content}")
//    String getContent();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.type}")
    String getType();

    @Value("#{target.created_date}")
    Long getCreatedDate();

}
