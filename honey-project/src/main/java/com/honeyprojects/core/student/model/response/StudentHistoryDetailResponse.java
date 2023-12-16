package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface StudentHistoryDetailResponse extends IsIdentified {

    @Value("#{target.student_id}")
    String getStudentId();

    @Value("#{target.history_id}")
    String getHistoryId();

    @Value("#{target.honey}")
    String getHoney();

    @Value("#{target.change_date}")
    Long getChangeDate();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.type}")
    Integer getType();

}