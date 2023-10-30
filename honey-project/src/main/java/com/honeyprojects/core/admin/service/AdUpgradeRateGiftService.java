package com.honeyprojects.core.admin.service;

import com.honeyprojects.entity.UpgradeRate;
import com.honeyprojects.entity.UpgrateRateGift;

import java.util.List;
import java.util.Optional;

public interface AdUpgradeRateGiftService {
    <S extends UpgrateRateGift> S save(S entity);

    Optional<UpgrateRateGift> findById(String s);

    void delete(UpgrateRateGift entity);

    void saveAllByGiftIdsAndUpgradeRateId(List<String> giftIds, String upgradeRateId);
}
