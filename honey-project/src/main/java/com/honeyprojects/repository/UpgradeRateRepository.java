package com.honeyprojects.repository;

import com.honeyprojects.entity.UpgradeRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UpgradeRateRepository extends JpaRepository<UpgradeRate, String> {
    public static final String NAME = "BaseUpgradeRateRepository";
}
