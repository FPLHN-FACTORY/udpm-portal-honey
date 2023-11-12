package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminConversionResponse extends IsIdentified {
    Integer getStt();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.ratio}")
    String getRatio();

    @Value("#{target.category_id}")
    String getCategoryId();

}
