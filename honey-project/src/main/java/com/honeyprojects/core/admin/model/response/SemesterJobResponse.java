package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface SemesterJobResponse extends IsIdentified {

    @Value("#{target.to_date}")
    Long getToDate();

}
