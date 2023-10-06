package com.honeyprojects.core.admin.model.response;


import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminCategoryResponse extends IsIdentified {

    Integer getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.category_status}")
    String getCategoryStatus();

    @Value("#{target.transaction_rights}")
    String getTransactionRights();
}
