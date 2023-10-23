package com.honeyprojects.core.student.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface StudentNotificationDetaiRespone {
    @Value("#{target.stt}")
    Integer getStt();

    @Value("#{target.idNotificationDetail}")
    String getNotificationDetailId();

    @Value("#{target.idObject}")
    String getObjectId();

    @Value("#{target.content}")
    String getContent();

    @Value("#{target.quantity}")
    Integer getQuantity();
}
