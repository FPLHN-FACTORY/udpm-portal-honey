package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminRequestConversionHistoryAddItemResponse extends IsIdentified {

    @Value("#{target.student_id}")
    String getStudentId();

    String getIdHistoryDetail();


    @Value("#{target.name_gift}")
    String getNameGift();

    @Value("#{target.gift_id}")
    String getGiftId();

    @Value("#{target.created_date}")
    Long getCreatedDate();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.note}")
    String getNote();

    @Value("#{target.quantity_gift}")
    Integer getQuantityGift();

}
