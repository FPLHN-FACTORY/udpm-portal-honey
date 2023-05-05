package com.portalprojects.entity;

import com.portalprojects.entity.base.PrimaryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@Table(name = "gift")
public class Gift extends PrimaryEntity {

    @Column(length = 10,nullable = false)
    private String code;

    @Column(length = 50)
    private String name;

    @Column
    private int pointGift ;

}
