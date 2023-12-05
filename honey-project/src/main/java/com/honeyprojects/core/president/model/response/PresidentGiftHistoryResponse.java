package com.honeyprojects.core.president.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface PresidentGiftHistoryResponse extends IsIdentified {

    @Value("#{target.student_id}")
    String getStudentId();

    @Value("#{target.history_detail_id}")
    String getHistoryDetailId();

    String getCategoryId();

    @Value("#{target.name_gift}")
    String getNameGift();

    @Value("#{target.gift_id}")
    String getGiftId();

    @Value("#{target.president_id}")
    String getPresidentId();

    @Value("#{target.honey_point}")
    Integer getHoneyPoint();

    @Value("#{target.change_date}")
    Long getChangeDate();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.note}")
    String getNote();

    @Value("#{target.quantity_gift}")
    Integer getQuantityGift();
}
