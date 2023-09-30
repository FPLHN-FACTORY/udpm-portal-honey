package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "archive_gift")
public class ArchiveGift extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_ID)
    private String archiveId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String giftId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String chestId;

}
