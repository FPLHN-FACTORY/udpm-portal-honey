package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface CensorDetailItemRequestResponse extends IsIdentified {

    @Value("#{target.student_id}")
    String getStudentId();

    @Value("#{target.history_detail_id}")
    String getHistoryDetailId();

    @Value("#{target.name_gift}")
    String getNameGift();

    @Value("#{target.gift_id}")
    String getGiftId();

    @Value("#{target.change_date}")
    Long getChangeDate();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.note}")
    String getNote();

    @Value("#{target.quantity_gift}")
    Integer getQuantityGift();

    @Value("#{target.teacher_id}")
    String getTeacherId();

    @Value("#{target.president_id}")
    String getPresidentId();

}
