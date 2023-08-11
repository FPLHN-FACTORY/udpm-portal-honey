package com.portalprojects.core.admin.service;

import com.portalprojects.core.admin.model.response.DocumentResponce;
import com.portalprojects.entity.Document;

import java.util.ArrayList;

public interface DocumentService {

    ArrayList<DocumentResponce> findAllByMissionDetailId(String studentCode, String missionId);
}
