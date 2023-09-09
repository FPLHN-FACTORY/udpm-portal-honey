package com.honeyprojects.core.teacher.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface TeacherStudentResponse extends IsIdentified {

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.phone}")
    String getPhone();

    @Value("#{target.khoa}")
    String getKhoa();




}
