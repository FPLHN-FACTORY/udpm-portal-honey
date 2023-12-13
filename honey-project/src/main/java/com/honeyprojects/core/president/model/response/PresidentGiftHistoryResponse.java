package com.honeyprojects.core.president.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface PresidentGiftHistoryResponse extends IsIdentified {

    @Value("#{target.student_id}")
    String getStudentId();

    @Value("#{target.history_detail_id}")
    String getHistoryDetailId();

    @Value("#{target.gift}")
    String getGift();

    @Value("#{target.chest}")
    String getChest();

    @Value("#{target.change_date}")
    Long getChangeDate();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.type}")
    Integer getType();

}
