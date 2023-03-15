package com.portalprojects.entity;

import com.portalprojects.entity.base.PrimaryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.Nationalized;

@Entity
@Data
@Table(name ="student")
public class Student extends PrimaryEntity {

    @Column(length = 10,nullable = false)
    private String code;

    @Column(length = 50)
    @Nationalized
    private String name;

    @Column(length = 50)
    private String email;

    @Column()
    private int score;

}
