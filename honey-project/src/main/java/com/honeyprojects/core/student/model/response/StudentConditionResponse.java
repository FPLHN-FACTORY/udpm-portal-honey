package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface StudentConditionResponse extends IsIdentified {

    @Value("#{target.name}")
    String getName();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.idGift}")
    String getIdGift();

}
