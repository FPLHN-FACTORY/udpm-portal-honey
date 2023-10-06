package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminRequestConversionHistoryResponse extends IsIdentified {

    @Value("#{target.student_id}")
    String getStudentId();

    @Value("#{target.name_gift}")
    String getNameGift();

    @Value("#{target.nameCategory}")
    String getNameCategory();

    @Value("#{target.honey_point}")
    Integer getHoneyPoint();

    @Value("#{target.created_date}")
    Long getCreatedDate();


    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.note}")
    String getNote();

}
