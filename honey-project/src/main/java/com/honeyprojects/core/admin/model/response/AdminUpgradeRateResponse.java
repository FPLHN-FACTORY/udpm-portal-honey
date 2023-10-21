package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

public interface AdminUpgradeRateResponse extends IsIdentified {
    String getStt();

    @Value("#{target.id}")
    String getId();
    @Value("#{target.original_honey_name}")
    String getOriginalHoneyName();

    @Value("#{target.destination_honey_id}")
    String getDestinationHoneyName();

    @Value("#{target.ratio}")
    String getRatio();

    @Value("#{target.status}")
    Integer getStatus();

}
