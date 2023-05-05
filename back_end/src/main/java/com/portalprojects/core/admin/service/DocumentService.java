package com.portalprojects.core.admin.service;

import com.portalprojects.entity.Document;

import java.util.ArrayList;

public interface DocumentService {

    ArrayList<Document> findAllByMissionDetailId(String studentCode,String missionId);
}
