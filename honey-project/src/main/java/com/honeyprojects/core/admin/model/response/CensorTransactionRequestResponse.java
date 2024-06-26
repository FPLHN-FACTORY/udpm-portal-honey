package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface CensorTransactionRequestResponse extends IsIdentified {

    String getStt();

    @Value("#{target.note}")
    String getNote();

    @Value("#{target.student_id}")
    String getStudentId();

    @Value("#{target.nameCategory}")
    String getNameCategory();

    @Value("#{target.honey_point}")
    Integer getHoneyPoint();

    @Value("#{target.created_date}")
    Long getCreatedDate();

    @Value("#{target.change_date}")
    Long getChangeDate();

    @Value("#{target.status}")
    Integer getStatus();

}
