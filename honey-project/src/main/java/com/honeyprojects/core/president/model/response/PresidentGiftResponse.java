package com.honeyprojects.core.president.model.response;


import com.honeyprojects.entity.base.IsIdentified;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.CategoryTransaction;
import org.springframework.beans.factory.annotation.Value;

public interface PresidentGiftResponse extends IsIdentified {

    @Value("#{target.name}")
    String getName();
}
