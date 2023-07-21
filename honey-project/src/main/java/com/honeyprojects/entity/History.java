package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import com.honeyprojects.infrastructure.contant.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "history")
public class History extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_NAME, nullable = false)
    private String nameGift;

    @Column(nullable = false)
    private Integer honeyPoint;

    @Column(nullable = false)
    private Long changeDate;

    @Column(length = EntityProperties.LENGTH_ID, nullable = false)
    private String giftId;

    @Column(length = EntityProperties.LENGTH_ID, nullable = false)
    private String studentId;

    @Column(length = EntityProperties.LENGTH_ID, nullable = false)
    private String teacherId;

    @Column(length = EntityProperties.LENGTH_NOTE)
    private String note;

    private Status status;

}
