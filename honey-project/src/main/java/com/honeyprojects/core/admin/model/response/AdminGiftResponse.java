package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminGiftResponse extends IsIdentified {

    Integer getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.quantity}")
    Integer getQuantity();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.type}")
    Integer getType();

    @Value("#{target.from_date}")
    String getFromDate();

    @Value("#{target.to_date}")
    String getToDate();

    @Value("#{target.semester_id}")
    String getSemesterId();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.note}")
    String getNote();
}
