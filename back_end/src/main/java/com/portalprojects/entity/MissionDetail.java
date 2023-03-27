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
@Table(name = "mission_detail")
public class MissionDetail extends PrimaryEntity {

    @Column(length = 10,nullable = false)
    private String studentId;

    @Column(length = 10,nullable = false)
    private String missionId;

}
