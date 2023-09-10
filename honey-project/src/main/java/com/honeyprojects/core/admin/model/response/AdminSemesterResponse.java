package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;

public interface AdminSemesterResponse extends IsIdentified {

    String getId();

    String getCode();

    String getName();

}
