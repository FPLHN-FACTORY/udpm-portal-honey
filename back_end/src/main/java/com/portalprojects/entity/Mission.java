package com.portalprojects.entity;

import com.portalprojects.entity.base.PrimaryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@ToString
@Table(name = "mission")
public class Mission extends PrimaryEntity {

    @Column(length = 10,nullable = false)
    private String code;

    @Column(length = 50)
    private String name;

    @Column(length = 50)
    private String describe;
}
