package com.honeyprojects.util.callApiPoint.service.impl;

import com.honeyprojects.infrastructure.apiconstants.ApiConstants;
import com.honeyprojects.infrastructure.session.HoneySession;
import com.honeyprojects.util.callApiPoint.model.dto.ClassSubjectDto;
import com.honeyprojects.util.callApiPoint.model.dto.ScoreTemplateDto;
import com.honeyprojects.util.callApiPoint.model.dto.ScoreTemplateVMDto;
import com.honeyprojects.util.callApiPoint.model.request.FilterClassSubject;
import com.honeyprojects.util.callApiPoint.model.request.FilterScoreTemplate;
import com.honeyprojects.util.callApiPoint.model.request.FilterScoreTemplateVM;
import com.honeyprojects.util.callApiPoint.model.response.ClassSubjectVM;
import com.honeyprojects.util.callApiPoint.model.response.ScoreTemplate;
import com.honeyprojects.util.callApiPoint.model.response.ScoreTemplateVM;
import com.honeyprojects.util.callApiPoint.service.CallApiCommonService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Component
public class CallApiCommonImpl implements CallApiCommonService {

    @Autowired
    private HoneySession honeySession;

    @Autowired
    private HttpSession session;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${domain.identity}")
    private String identityDomain;

    @Value("${domain.score.class}")
    private String scoreClassDomain;

    @Override
    // Call api lấy ra danh sách lớp học và môn
    public List<ClassSubjectVM> callApiClassSubjectVM(FilterClassSubject request) {
        String apiConnect = scoreClassDomain +
                ApiConstants.API_GET_ALL_SUBJECT_BY_EMAIL
                + "?emailStudent=" + request.getEmailStudent();

        HttpHeaders headers = new HttpHeaders();
        String authorizationToken = "Bearer " + honeySession.getToken();
        headers.set("Authorization", authorizationToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Object> httpEntity = new HttpEntity<>(headers);
        List<ClassSubjectDto> response = new ArrayList<>();
        try {
            ResponseEntity<List<ClassSubjectDto>> responseEntity =
                    restTemplate.exchange(apiConnect, HttpMethod.GET, httpEntity,
                            new ParameterizedTypeReference<List<ClassSubjectDto>>() {
                            });
            response = responseEntity.getBody();
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        List<ClassSubjectVM> classSubjectList = new ArrayList<>();
        if (response != null && response.size() > 0) {
            response.stream()
                    .forEach(el -> {
                        if (el.getStatus() == 1) {
                            ClassSubjectVM classSubjectVM = new ClassSubjectVM();
                            classSubjectVM.setClassId(el.getId());
                            classSubjectVM.setClassName(el.getName());
                            classSubjectVM.setSubjectId(el.getSubjectId());
                            classSubjectVM.setSubjectName(el.getSubjectName());
                            classSubjectVM.setTeacherEmail(el.getLecturerMail());
                            classSubjectList.add(classSubjectVM);
                        }
                    });
        }

        return classSubjectList;
    }

    @Override
    // Call api lấy ra danh sách đầu điểm của lớp
    public List<ScoreTemplate> callApiScoreTemplate(FilterScoreTemplate request) {
        String apiConnect = scoreClassDomain +
                ApiConstants.API_GET_ALL_SCORE_ELEMENT_BY_ID
                + "?idClass=" + request.getClassId();

        HttpHeaders headers = new HttpHeaders();
        String authorizationToken = "Bearer " + honeySession.getToken();
        headers.set("Authorization", authorizationToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Object> httpEntity = new HttpEntity<>(headers);
        List<ScoreTemplateDto> response = new ArrayList<>();
        try {
            ResponseEntity<List<ScoreTemplateDto>> responseEntity =
                    restTemplate.exchange(apiConnect, HttpMethod.GET, httpEntity,
                            new ParameterizedTypeReference<List<ScoreTemplateDto>>() {
                            });
            response = responseEntity.getBody();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        List<ScoreTemplate> scoreTemplateList = new ArrayList<>();

        if (response != null && response.size() > 0) {
            response.stream()
                    .forEach(el -> {
                        if (el.getStatus() == 1) {
                            ScoreTemplate scoreTemplate = new ScoreTemplate();
                            scoreTemplate.setId(el.getId());
                            scoreTemplate.setSubjectId(el.getSubjectId());
                            scoreTemplate.setName(el.getName());
                            scoreTemplate.setScoreType(el.getScoreType());
                            scoreTemplate.setMinScore(el.getMinScore());
                            scoreTemplate.setMaxScore(el.getMaxScore());
                            scoreTemplate.setScoreRatio(el.getScoreRatio());
                            scoreTemplate.setCreatedDate(el.getCreatedDate());
                            scoreTemplate.setStatus(el.getStatus());
                            scoreTemplate.setGroup(el.getGroup());
                            scoreTemplate.setIndex(el.getIndex());
                            scoreTemplateList.add(scoreTemplate);
                        }
                    });
        }
        return scoreTemplateList;
    }

    @Override
    // Call api lấy ra thông tin 1 đầu điểm của một sinh viên
    public List<ScoreTemplateVM> callApiScoreTemplateVM(FilterScoreTemplateVM request) {
        String apiConnect = scoreClassDomain +
                ApiConstants.API_GET_ALL_SCORE_BY_STUDENT_CODE
                + "?StudentCode=" + request.getStudentName()
                + "&idScoreElement=" + request.getScoreTemplateId();

        HttpHeaders headers = new HttpHeaders();
        String authorizationToken = "Bearer " + honeySession.getToken();
        headers.set("Authorization", authorizationToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Object> httpEntity = new HttpEntity<>(headers);
        List<ScoreTemplateVMDto> response = new ArrayList<>();
        try {
            ResponseEntity<List<ScoreTemplateVMDto>> responseEntity =
                    restTemplate.exchange(apiConnect, HttpMethod.GET, httpEntity,
                            new ParameterizedTypeReference<List<ScoreTemplateVMDto>>() {
                            });
            response = responseEntity.getBody();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        List<ScoreTemplateVM> scoreTemplateList = new ArrayList<>();

        if (response != null && response.size() > 0) {
            response.stream()
                    .forEach(el -> {
                        ScoreTemplateVM scoreTemplate = new ScoreTemplateVM();
                        scoreTemplate.setClassStudentId(el.getClass_StudentId());
                        scoreTemplate.setScoreElementId(el.getScoreElementId());
                        scoreTemplate.setName(el.getName());
                        scoreTemplate.setScoreType(el.getScoreType());
                        scoreTemplate.setMinScore(el.getMinScore());
                        scoreTemplate.setMaxScore(el.getMaxScore());
                        scoreTemplate.setScoreRatio(el.getScoreRatio());
                        scoreTemplate.setCreatedDate(el.getCreatedDate());
                        scoreTemplate.setStatus(el.getStatus());
                        scoreTemplate.setGroup(el.getGroup());
                        scoreTemplate.setIndex(el.getIndex());
                        scoreTemplate.setScore(el.getScore());
                        scoreTemplateList.add(scoreTemplate);
                    });
        }
        return scoreTemplateList;
    }

    @Override
    public boolean checkRoleIdentity() {
        return true;
//        String apiConnect = identityDomain +
//                ApiConstants.API_GET_ALL_USER_BY_ROLE_AND_MODULE
//                + session.getAttribute(SessionConstant.ID_USER)
//                + "/" + HonneyConstants.MODULE_CODE;
//        HttpHeaders headers = new HttpHeaders();
//        String authorizationToken = "Bearer " + honeySession.getToken();
//        headers.set("Authorization", authorizationToken);
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<Object> httpEntity = new HttpEntity<>(headers);
//        ResponseEntity<List<RoleIdentityResponse>> responseEntity =
//                restTemplate.exchange(apiConnect, HttpMethod.GET, httpEntity,
//                        new ParameterizedTypeReference<List<RoleIdentityResponse>>() {
//                        });
//
//        List<RoleIdentityResponse> response = responseEntity.getBody();
//        List<SimpleGrantedAuthority> authorities = (List<SimpleGrantedAuthority>) session.getAttribute(SessionConstant.ROLES);
//        boolean allAuthoritiesPresent = authorities.stream()
//                .allMatch(authority -> response.stream()
//                        .anyMatch(responseAuthority -> responseAuthority.getRoleCode().equals(authority.getAuthority())));
//
//        return allAuthoritiesPresent;
    }

}
