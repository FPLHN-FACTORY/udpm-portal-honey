package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.repository.AdGiftRepository;
import com.honeyprojects.core.admin.repository.AdUpgradeRateGiftRepository;
import com.honeyprojects.core.admin.repository.AdUpgradeRateRepository;
import com.honeyprojects.core.admin.service.AdUpgradeRateGiftService;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.UpgradeRate;
import com.honeyprojects.entity.UpgrateRateGift;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdUpgradeRateGiftServiceImpl implements AdUpgradeRateGiftService {
    AdUpgradeRateGiftRepository adUpgradeRateGiftRepository;

    AdGiftRepository adGiftRepository;

    AdUpgradeRateRepository adUpgradeRateRepository;
    @Override
    public <S extends UpgrateRateGift> S save(S entity) {
        return adUpgradeRateGiftRepository.save(entity);
    }

    @Override
    public Optional<UpgrateRateGift> findById(String s) {
        return adUpgradeRateGiftRepository.findById(s);
    }

    @Override
    public void delete(UpgrateRateGift entity) {
        adUpgradeRateGiftRepository.delete(entity);
    }
    @Override
    @Modifying
    public void saveAllByGiftIdsAndUpgradeRateId(List<String> giftIds, String upgradeRateId) {
        Optional<UpgradeRate> optUR = adUpgradeRateRepository.findById(upgradeRateId);
        if(optUR.isPresent()){
            if(!giftIds.isEmpty()){
                List<UpgrateRateGift> lstUpgrateRateGifts = new ArrayList<>();
                for (String giftId:
                        giftIds) {
                    UpgrateRateGift entity = new UpgrateRateGift();
                    entity.setIdUpgradeRate(upgradeRateId);
                    Optional<Gift> optG = adGiftRepository.findById(giftId);
                    if(optG.isPresent()){
                        entity.setIdGift(giftId);
                    }
                    lstUpgrateRateGifts.add(entity);
                }
                adUpgradeRateGiftRepository.saveAll(lstUpgrateRateGifts);
            }
        }
    }
}
