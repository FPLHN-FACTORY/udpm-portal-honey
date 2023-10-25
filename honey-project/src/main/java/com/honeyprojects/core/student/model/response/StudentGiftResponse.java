package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface StudentGiftResponse extends IsIdentified {

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

    @Value("#{target.honey}")
    Integer getHoney();

    @Value("#{target.honey_category_id}")
    String getHoneyCategoryId();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.note}")
    String getNote();
}
