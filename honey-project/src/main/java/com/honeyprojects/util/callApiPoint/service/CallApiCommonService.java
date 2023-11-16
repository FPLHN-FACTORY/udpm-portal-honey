package com.honeyprojects.util.callApiPoint.service;

import com.honeyprojects.util.callApiPoint.model.request.FilterClassSubject;
import com.honeyprojects.util.callApiPoint.model.request.FilterScoreTemplate;
import com.honeyprojects.util.callApiPoint.model.request.FilterScoreTemplateVM;
import com.honeyprojects.util.callApiPoint.model.response.ClassSubjectVM;
import com.honeyprojects.util.callApiPoint.model.response.ScoreTemplate;
import com.honeyprojects.util.callApiPoint.model.response.ScoreTemplateVM;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.util.List;

public interface CallApiCommonService {
    List<ClassSubjectVM> callApiClassSubjectVM(FilterClassSubject request) throws CertificateException, NoSuchAlgorithmException, KeyStoreException, IOException, KeyManagementException;

    List<ScoreTemplate> callApiScoreTemplate(FilterScoreTemplate request);

    ScoreTemplateVM callApiScoreTemplateVM(FilterScoreTemplateVM request);

    boolean checkRoleIdentity();
}
