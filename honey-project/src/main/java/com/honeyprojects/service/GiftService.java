package com.honeyprojects.service;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.entity.Gift;

import java.util.List;

public interface GiftService {

    List<Gift> getUpgradeRateGiftsExistBYIdUpgradeRate(String id, AdminUpgradeRateRequest searchParams);
}
