package com.honeyprojects.core.admin.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdNotificationResponse {
    @Value("#{target.id}")
    String getId();

    @Value("#{target.title}")
    String getTitle();

    @Value("#{target.created_date}")
    Long getCreatedDate();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.type}")
    String getType();

    @Value("#{target.student_id}")
    String getStudentId();
}
