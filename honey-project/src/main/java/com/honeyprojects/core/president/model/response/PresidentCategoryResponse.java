package com.honeyprojects.core.president.model.response;


import com.honeyprojects.entity.base.IsIdentified;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.CategoryTransaction;
import org.springframework.beans.factory.annotation.Value;

public interface PresidentCategoryResponse extends IsIdentified {

    Integer getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.category_status}")
    CategoryStatus getCategoryStatus();

    @Value("#{target.transaction_rights}")
    CategoryTransaction getTransactionRights();

    @Value("#{target.image}")
    byte[] getImage();
}
