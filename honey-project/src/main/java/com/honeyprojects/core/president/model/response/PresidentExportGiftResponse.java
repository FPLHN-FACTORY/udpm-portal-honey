package com.honeyprojects.core.president.model.response;


import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface PresidentExportGiftResponse extends IsIdentified {

    @Value("#{target.name}")
    String getName();

    @Value("#{target.status}")
    String getStatus();
}
