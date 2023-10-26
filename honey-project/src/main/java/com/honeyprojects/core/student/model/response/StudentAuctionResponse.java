package com.honeyprojects.core.student.model.response;

import com.honeyprojects.infrastructure.contant.Status;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface StudentAuctionResponse {

    @Value("#{target.stt}")
    Integer getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.idRoom}")
    String getIdRoom();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.starting_price}")
    BigDecimal getStartingPrice();

    @Value("#{target.last_price}")
    BigDecimal getLastPrice();

    @Value("#{target.honey}")
    BigDecimal getHoney();

    @Value("#{target.gift_id}")
    String getGiftId();

    @Value("#{target.honey_category_id}")
    String getHoneyCategoryId();

    @Value("#{target.gift_name}")
    String getGiftName();

    @Value("#{target.jump}")
    BigDecimal getJump();

    @Value("#{target.status}")
    Status getStatus();

    @Value("#{target.from_date}")
    Long getFromDate();

    @Value("#{target.to_date}")
    Long getToDate();

    @Value("#{target.image}")
    byte[] getImage();

    @Value("#{target.note}")
    String getNote();
}
