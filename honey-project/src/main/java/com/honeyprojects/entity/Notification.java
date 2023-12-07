package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "notification")
public class Notification extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_CONTENT)
    private String title;

    private NotificationType type;

    @Column(length = EntityProperties.LENGTH_ID)
    private String studentId;

    private NotificationStatus status;

    @ManyToOne
    @JoinColumn
    private HistoryDetail idHistoryDetail;

    private String presidentId;

    private String teacherId;

}
