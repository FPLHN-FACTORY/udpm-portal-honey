package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminPoinResponse extends IsIdentified {
    @Value("#{target.honey_point}")
    String getPoint();
}
