package com.honeyprojects.core.admin.repository;

import com.honeyprojects.entity.UpgrateRateGift;
import com.honeyprojects.repository.UpgradeRateGiftRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdUpgradeRateGiftRepository extends UpgradeRateGiftRepository {
}
