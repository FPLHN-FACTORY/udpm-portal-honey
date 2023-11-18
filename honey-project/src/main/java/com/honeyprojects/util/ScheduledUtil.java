package com.honeyprojects.util;

import com.honeyprojects.entity.Gift;
import com.honeyprojects.infrastructure.contant.ExpiryGift;
import com.honeyprojects.repository.GiftRepository;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author hieundph25894 - duchieu212
 */
@Component
public class ScheduledUtil {

    @Autowired
    @Qualifier("adGiftRepository")
    private GiftRepository giftRepository;

    @Scheduled(cron = "0 0 0 * * ?")
    public void myJodSetExpiryGift() {
        List<Gift> listGift = giftRepository.getAllGiftNotInHetHanVinhVienKhongHoatDong();
        List<Gift> listGiftSave = new ArrayList<>();
        listGift.forEach(gift -> {
            if (gift.getFromDate() == null && gift.getToDate() == null) {
                gift.setExpiry(ExpiryGift.VINH_VIEN);
            }
            Long currentTime = DateUtils.truncate(new Date(), Calendar.DATE).getTime();
            if (gift.getFromDate() != null && gift.getToDate() == null) {
                if (currentTime < gift.getFromDate()) {
                    gift.setExpiry(ExpiryGift.CHUA_HOAT_DONG);
                } else {
                    gift.setExpiry(ExpiryGift.VINH_VIEN);
                }
            } else if (gift.getFromDate() == null && gift.getToDate() != null) {
                if (gift.getToDate() < currentTime) {
                    gift.setExpiry(ExpiryGift.HET_HAN);
                } else {
                    gift.setExpiry(ExpiryGift.DANG_HOAT_DONG);
                }
            } else if (gift.getFromDate() != null && gift.getToDate() != null) {
                if (gift.getFromDate() <= currentTime && currentTime <= gift.getToDate()) {
                    gift.setExpiry(ExpiryGift.DANG_HOAT_DONG);
                } else if (gift.getFromDate() > currentTime && currentTime < gift.getToDate()) {
                    gift.setExpiry(ExpiryGift.CHUA_HOAT_DONG);
                } else if (currentTime > gift.getToDate()) {
                    gift.setExpiry(ExpiryGift.HET_HAN);
                }
            }
            listGiftSave.add(gift);
        });
        if (listGift.size() > 0) {
            giftRepository.saveAll(listGiftSave);
        }
    }
}
