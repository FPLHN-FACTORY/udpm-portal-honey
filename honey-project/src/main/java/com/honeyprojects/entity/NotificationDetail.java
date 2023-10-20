package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "notification_detail")
public class NotificationDetail extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_CONTENT)
    private String content;

    @Column(length = EntityProperties.LENGTH_ID)
    private String idObject;

    @Column(length = EntityProperties.LENGTH_ID)
    private String idNotification;

    private NotificationDetailType type;

    private Integer quantity;
}
