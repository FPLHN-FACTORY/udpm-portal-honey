package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminClubResponse extends IsIdentified {

    Integer getStt();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();
}
