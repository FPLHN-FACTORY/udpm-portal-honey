package com.honeyprojects.core.admin.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface AdminClubGiftResponse {

    Integer getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.type}")
    Integer getType();

    @Value("#{target.image}")
    String getImage();

}
