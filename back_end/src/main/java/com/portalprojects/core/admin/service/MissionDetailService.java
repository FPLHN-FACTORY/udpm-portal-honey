package com.portalprojects.core.admin.service;

import com.portalprojects.entity.MissionDetail;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;


public interface MissionDetailService {
    MissionDetail uploadFile(MultipartFile file);

    ArrayList<MissionDetail> findAll();

    MissionDetail deleteMission(String id);

    MissionDetail findOne(String id);

    ArrayList<MissionDetail> getAllByStudentCodeAndMissionCode(String studentCode, String missionCode);
}
