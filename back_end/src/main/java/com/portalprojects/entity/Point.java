package com.portalprojects.entity;

import com.portalprojects.entity.base.PrimaryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table( name = "point")
public class Point extends PrimaryEntity {

    @Column()
    private int score;

    @Column(length = 100)
    private String note;

    @Column()
    private Date expirationDate;

    @Column(length = 10,nullable = false)
    private String studentId;
}
