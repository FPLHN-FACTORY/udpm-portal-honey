package com.portalprojects.core.admin.model.response;

import com.portalprojects.entity.Document;
import com.portalprojects.entity.Mission;
import com.portalprojects.entity.MissionDetail;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(types = {Mission.class, Document.class})
public interface DocumentResponce {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.mission_detail_id}")
    String getMissionDetailId();

    @Value("#{target.doc_name}")
    String getDocName();

    @Value("#{target.doc_type}")
    String getDocType();

    @Value("#{target.size}")
    long getSize();

    @Value("#{target.data}")
    byte[] getData();

    @Value("#{target.upload_time}")
    Date getUploadTime();

    String getCodeMission();

    String getNameMission();

    String getDescribeMission();

    Integer getPointMission();

    Integer getDateRemaining();

    Integer getTimeRemaining();

    Integer getHourRemaining();

    Integer getMinuteRemaining();

    Integer getSecondRemaining();
}
