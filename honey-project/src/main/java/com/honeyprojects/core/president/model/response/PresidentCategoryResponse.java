package com.honeyprojects.core.president.model.response;


import com.honeyprojects.entity.base.IsIdentified;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.CategoryTransaction;
import org.springframework.beans.factory.annotation.Value;

public interface PresidentCategoryResponse extends IsIdentified {

    @Value("#{target.name}")
    String getName();

    @Value("#{target.category_status}")
    String getStatus();

}
