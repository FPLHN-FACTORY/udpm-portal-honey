package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface CensorDetailRequestResponse extends IsIdentified {

    @Value("#{target.history_detail_id}")
    String getHistoryDetailId();

    @Value("#{target.honey}")
    String getHoney();

    @Value("#{target.gift}")
    String getGift();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.type}")
    Integer getType();

    @Value("#{target.created_date}")
    Long getCreatedDate();

    @Value("#{target.change_date}")
    Long getChangeDate();

    @Value("#{target.note}")
    String getNote();

    @Value("#{target.student_id}")
    String getStudentId();

    @Value("#{target.teacher_id}")
    String getTeacherId();

    @Value("#{target.president_id}")
    String getPresidentId();
}
