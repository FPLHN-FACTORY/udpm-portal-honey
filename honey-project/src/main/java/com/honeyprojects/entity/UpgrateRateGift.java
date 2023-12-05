package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "upgrade_rate_gift")
public class UpgrateRateGift extends PrimaryEntity {
    @JoinColumn
    @ManyToOne
    private Gift idGift;

    @JoinColumn
    @ManyToOne
    private UpgradeRate idUpgradeRate;
}
