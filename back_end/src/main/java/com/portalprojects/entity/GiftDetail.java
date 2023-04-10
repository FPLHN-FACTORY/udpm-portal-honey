package com.portalprojects.entity;

import com.portalprojects.entity.base.PrimaryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@Table(name = "gift_detail")
public class GiftDetail extends PrimaryEntity {

    @Column(length = 50)
    private String studentId;

    @Column(length = 50)
    private String giftId;

}
