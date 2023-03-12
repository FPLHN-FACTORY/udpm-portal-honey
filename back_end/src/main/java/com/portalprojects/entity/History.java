package com.portalprojects.entity;

import com.portalprojects.entity.base.PrimaryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table( name = "history")
public class History  extends PrimaryEntity {

    @Column()
    private Date changeDate;

    @Column()
    private Date confirmDate;
}
