package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import com.honeyprojects.infrastructure.contant.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "auction")
public class Auction extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_ID)
    private String idRoom;

    @Column(length = EntityProperties.LENGTH_NAME)
    private String name;

    @Column
    private Long fromDate;

    @Column
    private Long toDate;

    @Column(length = EntityProperties.LENGTH_ID)
    private String giftId;

    @Column
    private BigDecimal startingPrice;

    @Column
    private BigDecimal jump;

    @Column
    private BigDecimal lastPrice;

    @Column(length = EntityProperties.LENGTH_ID)
    private String honeyCategoryId;

    @Column
    private Long honey;

    private Status status;

}
