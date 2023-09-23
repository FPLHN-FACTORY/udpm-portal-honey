package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;

public interface StudentUserResponse extends IsIdentified {

    String getName();

    String getEmail();

    String getUserName();

}
