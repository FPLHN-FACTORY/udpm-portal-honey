package com.portalprojects.core.admin.service;

import com.portalprojects.entity.Document;
import com.portalprojects.entity.MissionDetail;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;


public interface MissionDetailService {
    Document uploadFile(MultipartFile file,String studentCode, String missionCode);

    ArrayList<MissionDetail> findAll();

    Document deleteMission(String id,String studentCode);

    MissionDetail findOne(String id);

    MissionDetail addMissionDetail(String missionId);

//    ArrayList<MissionDetail> getAllByStudentCodeAndMissionCode(String studentCode, String missionCode);
}
