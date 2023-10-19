package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.model.response.AdminUpgradeRateResponse;
import com.honeyprojects.core.admin.repository.AdUpgradeRateRepository;
import com.honeyprojects.core.admin.service.AdUpgradeRateService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.UpgradeRate;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AdUpgradeRateServiceImpl implements AdUpgradeRateService {
    AdUpgradeRateRepository adUpgradeRateRepository;
    @Override
    public PageableObject<AdminUpgradeRateResponse> getUpgradeRate(AdminUpgradeRateRequest searchParams) {
        Pageable pageable = PageRequest.of(searchParams.getPage(), searchParams.getSize());
        return new PageableObject<>(adUpgradeRateRepository.getUpgradeRate(searchParams, pageable));
    }
    @Override
    public <S extends UpgradeRate> S save(S entity) {
        return adUpgradeRateRepository.save(entity);
    }
    @Override
    public Optional<UpgradeRate> findById(String s) {
        return adUpgradeRateRepository.findById(s);
    }
    @Override
    public void delete(UpgradeRate entity) {
        adUpgradeRateRepository.delete(entity);
    }
}
