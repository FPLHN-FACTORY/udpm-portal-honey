package com.honeyprojects.core.admin.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminGiftDetailResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.gift_id}")
    String getGiftId();

    @Value("#{target.category_id}")
    String getCategoryId();

    @Value("#{target.category_name}")
    String getCategoryName();
    @Value("#{target.honey}")
    String getHoney();
}
