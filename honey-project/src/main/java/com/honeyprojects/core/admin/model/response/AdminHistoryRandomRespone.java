package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;

public interface AdminHistoryRandomRespone extends IsIdentified {
    Long getChangeDate();

    Long getCreatedAt();

    String getStudentId();

    String getPresidentId();

    String getTeacherId();

    String getNote();

    Integer getStatus();

    Integer getType();

    String getClassName();

    String getSubject();

}
