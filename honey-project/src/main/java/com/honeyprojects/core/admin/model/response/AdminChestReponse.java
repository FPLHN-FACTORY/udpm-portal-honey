package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminChestReponse extends IsIdentified {

    @Value("#{target.stt}")
    String getStt();

    @Value("#{target.name}")
    String getName();

}
