package com.honeyprojects.core.admin.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminAuctionChartTableResponse {

    @Value("#{target.stt}")
    Integer getStt();

    @Value("#{target.gift_id}")
    String getGiftId();

    @Value("#{target.name}")
    String getGiftName();

    @Value("#{target.tongSoLuong}")
    int getQuantity();

}
