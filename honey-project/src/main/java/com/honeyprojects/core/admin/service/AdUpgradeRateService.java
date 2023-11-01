package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.model.request.CensorAddUpgradeRateRequest;
import com.honeyprojects.core.admin.model.response.AdminUpgradeRateResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.UpgradeRate;

import java.util.Optional;

public interface AdUpgradeRateService {
    PageableObject<AdminUpgradeRateResponse> getUpgradeRate(AdminUpgradeRateRequest searchParams);


    UpgradeRate save(CensorAddUpgradeRateRequest params);

    UpgradeRate update(CensorAddUpgradeRateRequest params, String id);

    Optional<UpgradeRate> findById(String s);

    void delete(String id);
}
