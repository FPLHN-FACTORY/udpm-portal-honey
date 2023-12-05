package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import com.honeyprojects.infrastructure.contant.Status;
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
@Table(name = "history_detail")
public class HistoryDetail extends PrimaryEntity {

    @JoinColumn
    @ManyToOne
    private History historyId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String studentId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String presidentId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String teacherId;

    @JoinColumn
    @ManyToOne
    private Honey honeyId;

    @JoinColumn
    @ManyToOne
    private Gift giftId;

    @JoinColumn
    @ManyToOne
    private Chest chestId;

    private Status status;

    private Integer quantityGift;

    private Integer honeyPoint;

    private String nameGift;
}
