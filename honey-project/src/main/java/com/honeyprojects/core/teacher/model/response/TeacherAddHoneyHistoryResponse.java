package com.honeyprojects.core.teacher.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface TeacherAddHoneyHistoryResponse extends IsIdentified {

    String getStt();

    @Value("#{target.mssv}")
    String getMssv();

    @Value("#{target.nameStudent}")
    String getNameStudent();

    @Value("#{target.note}")
    String getNote();

    @Value("#{target.nameCategory}")
    String getNameCategory();

    @Value("#{target.honey_point}")
    Integer getHoneyPoint();

    @Value("#{target.created_date}")
    Long getCreatedDate();

    @Value("#{target.status}")
    Integer getStatus();

}
