package com.honeyprojects.core.teacher.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface TeacherUseGiftRequestResponse extends IsIdentified {

    String getStt();

    @Value("#{target.student_id}")
    String getStudentId();

    String getLop();

    String getMon();

    @Value("#{target.created_date}")
    long getCreatedDate();

    String getStatus();

    String getNote();
}
