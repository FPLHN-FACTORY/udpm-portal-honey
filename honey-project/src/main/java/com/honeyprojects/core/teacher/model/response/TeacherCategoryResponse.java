package com.honeyprojects.core.teacher.model.response;


import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface TeacherCategoryResponse extends IsIdentified {

    @Value("#{target.name}")
    String getName();

}
