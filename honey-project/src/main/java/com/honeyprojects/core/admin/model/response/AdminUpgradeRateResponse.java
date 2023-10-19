package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminUpgradeRateResponse extends IsIdentified {
    String getStt();

    @Value("#{target.id}")
    String getId();
    @Value("#{target.original_honey_id}")
    String getOriginalHoneyId();

    @Value("#{target.destination_honey_id}")
    String getDestinationHoneyId();

    @Value("#{target.ratio}")
    String getRatio();

    @Value("#{target.status}")
    Integer getStatus();

}
