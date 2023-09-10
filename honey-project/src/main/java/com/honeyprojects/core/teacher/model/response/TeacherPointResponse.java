package com.honeyprojects.core.teacher.model.response;


import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface TeacherPointResponse extends IsIdentified {

    @Value("#{target.honey_point}")
    String getPoint();
}
