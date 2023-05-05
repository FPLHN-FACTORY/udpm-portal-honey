package com.portalprojects.core.admin.service.impl;

import com.portalprojects.core.admin.repository.AdDocumentRepository;
import com.portalprojects.core.admin.repository.AdMissionDetailRepostiory;
import com.portalprojects.core.admin.service.DocumentService;
import com.portalprojects.entity.Document;
import com.portalprojects.entity.MissionDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private AdDocumentRepository documentRepository;


    @Autowired
    private AdMissionDetailRepostiory missionDetailRepostiory;

    @Override
    public ArrayList<Document> findAllByMissionDetailId(String studentCode,String missionCode) {
        MissionDetail missionDetail = this.missionDetailRepostiory.getMissionDetailByStudentCodeAndMissionCode(studentCode, missionCode);
        if(missionDetail == null)
            return null;
        else
            return this.documentRepository.findAllByMissionDetailId(missionDetail.getId());
    }


}
