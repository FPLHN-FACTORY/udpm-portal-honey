package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface StudentArchiveGetChestResponse extends IsIdentified {

    @Value("#{target.chestId}")
    String getChestId();

    @Value("#{target.stt}")
    String getStt();

    @Value("#{target.name}")
    String getName();

}
