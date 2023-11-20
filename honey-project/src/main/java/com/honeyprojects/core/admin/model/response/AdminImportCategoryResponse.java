package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminImportCategoryResponse extends IsIdentified {

    @Value("#{target.name}")
    String getName();

    @Value("#{target.status}")
    String getStatus();

}
