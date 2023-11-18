package com.honeyprojects.core.student.model.response;

import com.honeyprojects.infrastructure.contant.Status;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface StudentAuctionResponse {

    @Value("#{target.stt}")
    Integer getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.giftName}")
    String getGiftName();

    @Value("#{target.fromDate}")
    Long getFromDate();

    @Value("#{target.toDate}")
    Long getToDate();

    @Value("#{target.starting_price}")
    BigDecimal getStartingPrice();

    @Value("#{target.last_price}")
    BigDecimal getLastPrice();

    @Value("#{target.nameCategory}")
    String getNameCategory();

    @Value("#{target.jump}")
    BigDecimal getJump();

    @Value("#{target.status}")
    Status getStatus();

    @Value("#{target.idCategory}")
    String getIDCategory();
}
