package com.honeyprojects.core.admin.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminUpgradeRateGiftResponse {

    Integer getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.destination}")
    String getDestinationHoney();

    @Value("#{target.original}")
    String getOriginalHoney();

    @Value("#{target.quantity_destination}")
    Long getQuantityDestination();

    @Value("#{target.quantity_original}")
    Long getQuantityOriginal();

    @Value("#{target.ratio}")
    Double getRatio();

    @Value("#{target.status}")
    Long getStatus();

    @Value("#{target.gift_name}")
    String getGiftName();

    @Value("#{target.destination_id}")
    String getDestinationId();

    @Value("#{target.original_id}")
    String getOriginalId();

    @Value("#{target.gift_id}")
    String getGiftId();
}
