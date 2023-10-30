package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface CensorGiftSelectResponse extends IsIdentified {
    @Value("#{target.id}")
    String getId();

    @Value("#{target.name}")
    String getName();
}
