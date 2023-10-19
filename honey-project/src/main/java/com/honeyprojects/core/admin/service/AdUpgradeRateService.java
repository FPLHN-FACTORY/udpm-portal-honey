package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.model.response.AdminUpgradeRateResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.UpgradeRate;

import java.util.Optional;

public interface AdUpgradeRateService {
    PageableObject<AdminUpgradeRateResponse> getUpgradeRate(AdminUpgradeRateRequest searchParams);

    <S extends UpgradeRate> S save(S entity);

    Optional<UpgradeRate> findById(String s);

    void delete(UpgradeRate entity);
}
