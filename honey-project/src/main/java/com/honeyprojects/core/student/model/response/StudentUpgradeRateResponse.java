package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface StudentUpgradeRateResponse extends IsIdentified {

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.original_honey_name}")
    String getOriginalHoneyName();

    @Value("#{target.quantity_original_honey}")
    String getOriginalHoney();

    @Value("#{target.destination_honey_name}")
    String getDestinationHoneyName();

    @Value("#{target.quantity_destination_honey}")
    String getDestinationHoney();

    @Value("#{target.ratio}")
    String getRatio();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.image1}")
    String getImage1();

    @Value("#{target.image2}")
    String getImage2();
}
