package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminGiftResponse extends IsIdentified {

    Integer getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.quantity}")
    Integer getQuantity();

    @Value("#{target.limit_quantity}")
    Integer getLimitQuantity();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.transaction_gift}")
    Integer getTransactionGift();

    @Value("#{target.type}")
    Integer getType();

    @Value("#{target.from_date}")
    String getFromDate();

    @Value("#{target.to_date}")
    String getToDate();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.note}")
    String getNote();

    @Value("#{target.expiry}")
    String getExpiry();

    @Value("#{target.score_ratio}")
    Long getScoreRatio();

    @Value("#{target.score}")
    Double getScore();

    @Value("#{target.score_ratio_min}")
    Long getScoreRatioMin();

    @Value("#{target.score_ratio_max}")
    Long getScoreRatioMax();
}
