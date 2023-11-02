package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.common.base.PageableObject;

public interface AdUpgradeRateGiftService {
    PageableObject getAllUpgradeRateGift(AdminUpgradeRateRequest searchParams);
    Boolean addOrUpdateUpgradeRateGift(AdminUpgradeRateGiftRequest searchParams);
    Boolean updateStatusUpgradeRateGift(String id, Long status);
}
