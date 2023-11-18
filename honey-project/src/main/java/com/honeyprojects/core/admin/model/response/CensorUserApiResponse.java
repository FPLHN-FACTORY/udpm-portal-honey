package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;

public interface CensorUserApiResponse extends IsIdentified {

    String getName();

    String getCode();

    String getEmail();

}
