package com.honeyprojects.repository;

import com.honeyprojects.entity.UpgrateRateGift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UpgradeRateGiftRepository extends JpaRepository<UpgrateRateGift, String> {

}
