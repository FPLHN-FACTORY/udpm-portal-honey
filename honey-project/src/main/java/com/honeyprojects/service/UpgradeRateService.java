package com.honeyprojects.service;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.UpgradeRate;

import java.util.List;

public interface UpgradeRateService {

    PageableObject<UpgradeRate> getLstUpgradeRatesExist(AdminUpgradeRateRequest searchParams);
}
