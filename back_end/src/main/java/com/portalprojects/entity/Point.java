package com.portalprojects.entity;

import com.portalprojects.entity.base.PrimaryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table( name = "point")
public class Point extends PrimaryEntity {

    @Column(length = 10,nullable = false)
    private String code;

    @Column()
    private int score;

    @Column(length = 100)
    private String note;

    @Column()
    private Date expirationDate;

    @Column(length = 10,nullable = false)
    private String studentId;
}
