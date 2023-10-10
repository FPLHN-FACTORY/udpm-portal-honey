package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import com.honeyprojects.infrastructure.contant.Status;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface AdminAuctionResponse extends IsIdentified {

    Integer getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.category_name}")
    String getCategoryName();

    @Value("#{target.category_id}")
    String getCategoryId();

    @Value("#{target.honey}")
    Long getHoney();

    @Value("#{target.status}")
    Status getStatus();
}