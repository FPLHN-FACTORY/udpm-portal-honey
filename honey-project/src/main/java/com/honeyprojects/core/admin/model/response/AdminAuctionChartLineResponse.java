package com.honeyprojects.core.admin.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminAuctionChartLineResponse {

    @Value("#{target.gift_id}")
    String getGiftId();

    @Value("#{target.name}")
    String getGiftName();

    @Value("#{target.tongSoLuong}")
    int getQuantity();

    @Value("#{target.ngay}")
    String getDate();

}
