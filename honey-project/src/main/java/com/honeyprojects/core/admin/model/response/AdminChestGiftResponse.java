package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminChestGiftResponse extends IsIdentified {

    String getStt();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.to_date}")
    Long getToDate();

    @Value("#{target.from_date}")
    Long getFromDate();

    @Value("#{target.code}")
    String getCode();

}
