package com.honeyprojects.core.admin.model.response;


import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminExportCategoryResponse extends IsIdentified {

    @Value("#{target.name}")
    String getName();

    @Value("#{target.category_status}")
    String getStatus();
}
