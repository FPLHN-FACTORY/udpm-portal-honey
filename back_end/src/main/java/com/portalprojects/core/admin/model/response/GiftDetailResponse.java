package com.portalprojects.core.admin.model.response;

import com.portalprojects.entity.Gift;
import com.portalprojects.entity.GiftDetail;
import com.portalprojects.entity.Mission;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Gift.class, Mission.class, GiftDetail.class})
public interface GiftDetailResponse {

    @Value("#{target.name}")
    String getName();

    @Value("#{target.point}")
    int getPointGift();

}
