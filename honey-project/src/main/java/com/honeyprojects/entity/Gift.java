package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import com.honeyprojects.infrastructure.contant.ExpiryGift;
import com.honeyprojects.infrastructure.contant.StatusGift;
import com.honeyprojects.infrastructure.contant.TransactionGift;
import com.honeyprojects.infrastructure.contant.TypeGift;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "gift")
@ToString
public class Gift extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_CODE)
    private String code;

    @Column(length = EntityProperties.LENGTH_NAME)
    private String name;

    private StatusGift status;

    private TypeGift type;

    @Enumerated(EnumType.STRING)
    private ExpiryGift expiry;

    private TransactionGift transactionGift;

    private Integer quantity;

    private Long toDate;

    private Long fromDate;

    private Long numberEndDate;

    private String note;

    private Integer limitQuantity;

    private String image;

}