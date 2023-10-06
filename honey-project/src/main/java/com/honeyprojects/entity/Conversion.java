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
@Table(name = "conversion")
public class Conversion extends PrimaryEntity {

    private String code;

    private Double ratio;

    private Status status;

    @Column(length = EntityProperties.LENGTH_ID)
    private String giftId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String categoryId;

}
