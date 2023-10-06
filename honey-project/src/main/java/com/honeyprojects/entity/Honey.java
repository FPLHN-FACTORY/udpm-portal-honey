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
@Table(name = "honey")
public class Honey extends PrimaryEntity {

    @Column(nullable = false)
    private Integer honeyPoint;

    @Column(length = EntityProperties.LENGTH_NOTE)
    private String reason;

    @Column(length = EntityProperties.LENGTH_ID)
    private String userSemesterId;

    @Column(length = EntityProperties.LENGTH_ID, nullable = false)
    private String honeyCategoryId;

    @Column(length = EntityProperties.LENGTH_ID, nullable = false)
    private String studentId;

    private Status status;

}
