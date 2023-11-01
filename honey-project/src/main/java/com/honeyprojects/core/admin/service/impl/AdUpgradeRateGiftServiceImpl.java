package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.model.response.AdminUpgradeRateGiftResponse;
import com.honeyprojects.core.admin.repository.AdUpgradeRateGiftRepository;
import com.honeyprojects.core.admin.repository.AdUpgradeRateRepository;
import com.honeyprojects.core.admin.service.AdUpgradeRateGiftService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.UpgradeRate;
import com.honeyprojects.entity.UpgrateRateGift;
import com.honeyprojects.infrastructure.contant.Status;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
@AllArgsConstructor
public class AdUpgradeRateGiftServiceImpl implements AdUpgradeRateGiftService {

    @Autowired
    private AdUpgradeRateGiftRepository adUpgradeRateGiftRepository;

    @Autowired
    private AdUpgradeRateRepository adUpgradeRateRepository;

    @Override
    public PageableObject getAllUpgradeRateGift(AdminUpgradeRateRequest searchParams) {
        Pageable pageable = PageRequest.of(searchParams.getPage(), searchParams.getSize());
        Page<AdminUpgradeRateGiftResponse> pageRes = adUpgradeRateGiftRepository.getAllUpgradeRateGift(pageable, searchParams);
        return new PageableObject(pageRes);
    }

    @Override
    public Boolean addOrUpdateUpgradeRateGift(AdminUpgradeRateGiftRequest request) {
        try {
            UpgradeRate upgradeRate;
            if (request.getUpgradeRateId() != null) {
                upgradeRate = adUpgradeRateRepository.findById(request.getUpgradeRateId()).orElseGet(UpgradeRate::new);
            } else {
                upgradeRate = new UpgradeRate();
                long entityCount = adUpgradeRateRepository.count();
                upgradeRate.setCode("UR" + (entityCount + 1));
            }
            upgradeRate.setStatus(request.getStatus() == 0 ? Status.HOAT_DONG : Status.KHONG_HOAT_DONG);
            upgradeRate.setDestinationHoney(request.getDestinationHoneyId());
            upgradeRate.setQuantityDestinationHoney(request.getQuantityDestinationHoney().intValue());
            upgradeRate.setOriginalHoney(request.getOriginalHoneyId());
            upgradeRate.setQuantityOriginalHoney(request.getQuantityOriginalHoney().intValue());
            upgradeRate.setRatio(request.getRatio());
            upgradeRate.setId(adUpgradeRateRepository.save(upgradeRate).getId());

            Iterable<UpgrateRateGift> iterable = adUpgradeRateGiftRepository.findAllByIdUpgradeRate(upgradeRate.getId());

            if (request.getIdGifts() != null && request.getIdGifts().size() != 0) {
                List<UpgrateRateGift> upgrateRateGifts = new ArrayList<>();
                for (String el : request.getIdGifts()) {
                    UpgrateRateGift data = new UpgrateRateGift();
                    data.setIdUpgradeRate(upgradeRate.getId());
                    data.setIdGift(el);
                    upgrateRateGifts.add(data);
                }
                adUpgradeRateGiftRepository.deleteAll(iterable);
                adUpgradeRateGiftRepository.saveAll(upgrateRateGifts);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean updateStatusUpgradeRateGift(String id, Long status) {
        UpgradeRate upgradeRate = adUpgradeRateRepository.findById(id).get();
        if (status.equals(1L)) {
            upgradeRate.setStatus(Status.HOAT_DONG);
        } else {
            upgradeRate.setStatus(Status.KHONG_HOAT_DONG);
        }
        adUpgradeRateRepository.save(upgradeRate);
        return true;
    }
}
