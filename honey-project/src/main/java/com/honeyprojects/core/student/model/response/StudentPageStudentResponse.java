package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface StudentPageStudentResponse extends IsIdentified {

    @Value("#{target.stt}")
    Integer getStt();

    @Value("#{target.student_id}")
    String getStudentId();

    @Value("#{target.totalHoney}")
    Integer getTotalHoney();

}
