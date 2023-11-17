package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import com.honeyprojects.infrastructure.contant.StatusGift;
import com.honeyprojects.infrastructure.contant.TransactionGift;
import com.honeyprojects.infrastructure.contant.TypeGift;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "gift")
public class Gift extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_CODE)
    private String code;

    @Column(length = EntityProperties.LENGTH_NAME)
    private String name;

    private StatusGift status;

    private TypeGift type;

    private TransactionGift transactionGift;

    private Integer quantity;

    private Long toDate;

    private Long fromDate;

    private String note;

    private Integer limitQuantity;

    @Column(length = EntityProperties.LENGTH_ID)
    private String semesterId;

    private String image;

}