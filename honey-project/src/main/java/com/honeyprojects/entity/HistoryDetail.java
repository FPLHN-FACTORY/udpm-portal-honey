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
@Table(name = "history_detail")
public class HistoryDetail extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_ID)
    private String studentId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String presidentId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String teacherId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String honeyId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String giftId;

    private Status status;

    private Integer quantityGift;

    private Integer honeyPoint;

    private String nameGift;
}
