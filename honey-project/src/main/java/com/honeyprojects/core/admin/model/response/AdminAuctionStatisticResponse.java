package com.honeyprojects.core.admin.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminAuctionStatisticResponse {

    @Value("#{target.id_count}")
    String getSumAuction();

    @Value("#{target.total_quantity}")
    String getSumNumberGift();

    @Value("#{target.total_starting_price}")
    String getSumStartPrice();

    @Value("#{target.total_last_price}")
    String getSumLastPrice();
}
