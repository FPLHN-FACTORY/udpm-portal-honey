package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminRequestConversionHistoryResponse extends IsIdentified {

    @Value("#{target.student_id}")
    String getStudentId();

    @Value("#{target.gift}")
    String getGift();

    @Value("#{target.change_date}")
    Long getChangeDate();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.note}")
    String getNote();

    @Value("#{target.teacher_id}")
    String getTeacherId();

    @Value("#{target.teacher_id_name}")
    String getTeacherIdName();

    @Value("#{target.president_id}")
    String getPresidentId();

    @Value("#{target.president_name}")
    String getPresidentName();

}
