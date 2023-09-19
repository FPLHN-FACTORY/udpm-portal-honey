package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;

public interface StudentUserApiResponse extends IsIdentified {

    String getName();

    String getCode();

    String getEmail();

}
