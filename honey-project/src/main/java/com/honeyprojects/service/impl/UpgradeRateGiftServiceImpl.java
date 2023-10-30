package com.honeyprojects.service.impl;

import com.honeyprojects.repository.UpgradeRateGiftRepository;
import com.honeyprojects.repository.UpgradeRateRepository;
import com.honeyprojects.service.UpgradeRateGiftService;
import com.honeyprojects.service.UpgradeRateService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UpgradeRateGiftServiceImpl implements UpgradeRateGiftService {
    UpgradeRateGiftRepository upgradeRateGiftRepository;


}
