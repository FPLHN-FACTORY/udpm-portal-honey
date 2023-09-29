package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "chest_gift")
public class ChestGift extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_ID, nullable = false)
    private String chestId;

    @Column(length = EntityProperties.LENGTH_ID, nullable = false)
    private String giftId;

}
