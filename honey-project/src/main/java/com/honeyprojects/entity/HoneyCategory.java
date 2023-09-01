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
@Table(name = "honey_category")
public class HoneyCategory extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_ID, nullable = false)
    private String categoryId;

    private Status status;

    private Integer type;

}