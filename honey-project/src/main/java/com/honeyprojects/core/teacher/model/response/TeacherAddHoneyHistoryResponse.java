package com.honeyprojects.core.teacher.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface TeacherAddHoneyHistoryResponse extends IsIdentified {

    String getStt();

    @Value("#{target.note}")
    String getNote();

    @Value("#{target.student_id}")
    String getStudentId();

    @Value("#{target.honey}")
    String getHoney();

    @Value("#{target.change_date}")
    Long getChangeDate();

    @Value("#{target.status}")
    Integer getStatus();

}
