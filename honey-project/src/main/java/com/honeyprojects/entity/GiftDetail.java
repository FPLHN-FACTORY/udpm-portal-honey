package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "giftDetail")
public class GiftDetail extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_ID)
    private String giftId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String categoryId;

    private Integer honey;
}
