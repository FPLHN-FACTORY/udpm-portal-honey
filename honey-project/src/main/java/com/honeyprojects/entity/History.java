package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "history")
public class History extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_NAME)
    private String nameGift;

    private Integer honeyPoint;

    private Long changeDate;

    private Long createdAt;

    @Column(length = EntityProperties.LENGTH_ID)
    private String giftId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String studentId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String teacherId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String honeyId;

    @Column(length = EntityProperties.LENGTH_NOTE)
    private String note;

    private HoneyStatus status;

    private TypeHistory type;

}
