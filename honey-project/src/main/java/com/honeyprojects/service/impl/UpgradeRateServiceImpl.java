package com.honeyprojects.service.impl;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.UpgradeRate;
import com.honeyprojects.repository.UpgradeRateRepository;
import com.honeyprojects.service.UpgradeRateService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UpgradeRateServiceImpl implements UpgradeRateService {
    UpgradeRateRepository upgradeRateRepository;

    @Override
    public PageableObject<UpgradeRate> getLstUpgradeRatesExist(AdminUpgradeRateRequest searchParams) {
        Pageable pageable = PageRequest.of(searchParams.getPage(), searchParams.getSize());
        return new PageableObject<>(upgradeRateRepository.getLstUpgradeRatesExist(searchParams, pageable));
    }
}
