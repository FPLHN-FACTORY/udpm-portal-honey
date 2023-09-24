package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface StudentHoneyResponse extends IsIdentified {

    @Value("#{target.honey_point}")
    Integer getPoint();

}
