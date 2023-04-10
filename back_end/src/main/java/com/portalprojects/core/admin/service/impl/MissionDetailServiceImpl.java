package com.portalprojects.core.admin.service.impl;

import com.portalprojects.core.admin.repository.AdMissionDetailRepostiory;
import com.portalprojects.core.admin.repository.AdMissionRepository;
import com.portalprojects.core.admin.repository.AdStudentRepository;
import com.portalprojects.core.admin.service.MissionDetailService;
import com.portalprojects.core.common.base.ResponseObject;
import com.portalprojects.entity.MissionDetail;
import com.portalprojects.repository.MissionDetailRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;


@Service
public class MissionDetailServiceImpl implements MissionDetailService {

    @Autowired
    private AdMissionDetailRepostiory missionDetailRepostiory;

    @Autowired
    private AdMissionRepository missionRepository;

    @Autowired
    private AdStudentRepository studentRepository;

    @Override
    public MissionDetail uploadFile(MultipartFile file) {
        String idMission = "NV1";
        String idStudent = "SV1";
        try{
            MissionDetail missionDetail = new MissionDetail();
            missionDetail.setDocName(file.getOriginalFilename());
            missionDetail.setSize(file.getSize());
            missionDetail.setData(file.getBytes());
            missionDetail.setMissionId(missionRepository.findByCode(idMission).getId());
            missionDetail.setStudentId(studentRepository.findByCode(idStudent).getId());
            missionDetail.setUploadTime(new Date());
            missionDetail.setDocType(file.getContentType());
            missionDetailRepostiory.save(missionDetail);
            return missionDetail;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ArrayList<MissionDetail> findAll() {
        return (ArrayList<MissionDetail>) missionDetailRepostiory.findAll();
    }

    @Override
    public MissionDetail deleteMission(String id) {
        Optional<MissionDetail> missionDetailOptional = missionDetailRepostiory.findById(id);
        missionDetailRepostiory.delete(missionDetailOptional.get());
        return missionDetailOptional.get();

    }

    @Override
    public MissionDetail findOne(String id) {
        return missionDetailRepostiory.findById(id).get();
    }

    @Override
    public ArrayList<MissionDetail> getAllByStudentCodeAndMissionCode(String studentCode, String missionCode) {
        return missionDetailRepostiory.getAllMissionDetailByStudentCodeAndMissionCode(studentCode,missionCode);
    }

}
