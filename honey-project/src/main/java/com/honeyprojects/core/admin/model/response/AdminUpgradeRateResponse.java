package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

public interface AdminUpgradeRateResponse extends IsIdentified {
    String getStt();

    @Value("#{target.id}")
    String getId();
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
