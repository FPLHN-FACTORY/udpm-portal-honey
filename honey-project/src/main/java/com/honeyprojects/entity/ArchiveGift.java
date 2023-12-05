package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "archive_gift")
@ToString
public class ArchiveGift extends PrimaryEntity {

    @JoinColumn
    @ManyToOne
    private Archive archiveId;

    @JoinColumn
    @ManyToOne
    private Gift giftId;

    @JoinColumn
    @ManyToOne
    private Chest chestId;

    private String note;

    private Integer quantity;


}
