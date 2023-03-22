package com.portalprojects.entity;

import com.portalprojects.entity.base.PrimaryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Nationalized;

@Entity
@Getter
@Setter
@ToString
@Table(name = "teacher")
public class Teacher extends PrimaryEntity {

    @Column(length = 10,nullable = false)
    private String code;

    @Column(length = 50)
    @Nationalized
    private String name;
}
