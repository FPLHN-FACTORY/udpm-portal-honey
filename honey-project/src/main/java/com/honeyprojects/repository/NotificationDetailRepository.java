package com.honeyprojects.repository;

import com.honeyprojects.entity.NotificationDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(NotificationDetailRepository.NAME)
public interface NotificationDetailRepository extends JpaRepository<NotificationDetail, String> {
    public static final String NAME = "BaseNotificationDetailRepository";
}
