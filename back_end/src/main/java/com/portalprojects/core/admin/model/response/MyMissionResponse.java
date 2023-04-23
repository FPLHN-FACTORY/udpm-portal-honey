package com.portalprojects.core.admin.model.response;

import com.portalprojects.entity.Mission;
import jakarta.persistence.Column;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(types = {Mission.class})
public interface MyMissionResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.describe_mission}")
    String getDescribeMission();

    @Value("#{target.point_mission}")
    int getPointMission();

    @Value("#{target.start_day}")
    Date getStartDay();

    @Value("#{target.finish_day}")
    Date getFinishDay();

    Integer getCount();
}
