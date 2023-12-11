package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminAddHoneyHistoryResponse  extends IsIdentified {

    String getStt();

    @Value("#{target.student_id}")
    String getStudentId();

    @Value("#{target.student_name}")
    String getStudentName();

    @Value("#{target.honey}")
    String getHoney();

    @Value("#{target.change_date}")
    Long getChangeDate();

}
