package com.honeyprojects.service.impl;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.repository.GiftRepository;
import com.honeyprojects.service.GiftService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GiftServiceImpl implements GiftService {
    @Qualifier("BaseGiftRepository")
    @Autowired
    GiftRepository giftRepository;

    @Override
    public List<Gift> getUpgradeRateGiftsExistBYIdUpgradeRate(String id, AdminUpgradeRateRequest searchParams) {
        return giftRepository.getUpgradeRateGiftsExistBYIdUpgradeRate(id, searchParams);
    }
}
