package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import com.honeyprojects.infrastructure.contant.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "upgrade_rate")
public class UpgradeRate extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_CODE)
    private String code;

    @Column()
    private Integer quantityOriginalHoney;

    @Column()
    private Integer quantityDestinationHoney;

    @Column()
    private String originalHoney;

    @Column()
    private String destinationHoney;

    @Column()
    private Double ratio;

    @Column()
    private Status status;

}