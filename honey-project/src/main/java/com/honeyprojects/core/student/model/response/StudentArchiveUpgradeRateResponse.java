package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface StudentArchiveUpgradeRateResponse extends IsIdentified {

    @Value("#{target.name}")
    String getName();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.quantity}")
    String getQuantity();

    @Value("#{target.idGift}")
    String getIdGift();
}
