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
@Table(name = "club")
public class Club extends PrimaryEntity {

    @Column(nullable = false)
    private String code;

    @Column(nullable = false, length = EntityProperties.LENGTH_NAME)
    private String name;

    @Column(nullable = false)
    private Status status;

}
