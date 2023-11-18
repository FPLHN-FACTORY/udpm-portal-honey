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
@Table(name = "verification")
public class Verification extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_ID)
    private String studentId;

    private String code;

    private Long expiryTime;
}
