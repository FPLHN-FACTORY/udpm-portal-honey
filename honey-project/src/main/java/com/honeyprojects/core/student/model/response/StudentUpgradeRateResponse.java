package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface StudentUpgradeRateResponse extends IsIdentified {
    String getStt();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.originalHoneyName}")
    String getOriginalHoneyName();

    @Value("#{target.destinationHoneyName}")
    String getDestinationHoneyName();

    @Value("#{target.ratio}")
    String getRatio();

    @Value("#{target.status}")
    Integer getStatus();
}
