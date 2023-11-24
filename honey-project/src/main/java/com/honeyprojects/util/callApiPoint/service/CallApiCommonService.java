package com.honeyprojects.util.callApiPoint.service;

import com.honeyprojects.util.callApiPoint.model.request.FilterClassSubject;
import com.honeyprojects.util.callApiPoint.model.request.FilterScoreTemplate;
import com.honeyprojects.util.callApiPoint.model.request.FilterScoreTemplateVM;
import com.honeyprojects.util.callApiPoint.model.response.ClassSubjectVM;
import com.honeyprojects.util.callApiPoint.model.response.ScoreTemplate;
import com.honeyprojects.util.callApiPoint.model.response.ScoreTemplateVM;

import java.util.List;

public interface CallApiCommonService {
    List<ClassSubjectVM> callApiClassSubjectVM(FilterClassSubject request);

    List<ScoreTemplate> callApiScoreTemplate(FilterScoreTemplate request);

    List<ScoreTemplateVM> callApiScoreTemplateVM(FilterScoreTemplateVM request);

    boolean checkRoleIdentity();
}
