package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import com.honeyprojects.infrastructure.contant.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "notification")
public class Notification extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_CONTENT)
    private String content;

    private Integer type;

    @Column(length = EntityProperties.LENGTH_ID, nullable = false)
    private String studentId;

    private Status status;
}
