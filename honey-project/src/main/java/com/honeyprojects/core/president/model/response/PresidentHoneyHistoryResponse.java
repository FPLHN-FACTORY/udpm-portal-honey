package com.honeyprojects.core.president.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface PresidentHoneyHistoryResponse extends IsIdentified {

    Integer getStt();

    @Value("#{target.student_id}")
    String getStudentId();

    @Value("#{target.honey}")
    String getHoney();

    @Value("#{target.created_date}")
    Long getCreatedDate();

    @Value("#{target.change_date}")
    Long getChangeDate();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.type}")
    Integer getType();
}
