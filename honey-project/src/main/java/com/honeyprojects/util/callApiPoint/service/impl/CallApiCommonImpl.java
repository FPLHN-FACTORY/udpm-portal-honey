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
            // Fake data
            response = generateFakeData();
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

    public static List<ClassSubjectDto> generateFakeData() {
        List<ClassSubjectDto> fakeDataList = new ArrayList<>();

        for (int i = 1; i <= 5; i++) {
            ClassSubjectDto fakeData = createFakeClassSubjectDto(i);
            fakeDataList.add(fakeData);
        }

        return fakeDataList;
    }

    private static ClassSubjectDto createFakeClassSubjectDto(int index) {
        return ClassSubjectDto.builder()
                .id("IDClassSubjectDto" + index)
                .lecturerId("LecturerID" + index)
                .transferLecturerId("TransferLecturerID" + index)
                .blockSemesterId("BlockSemesterID" + index)
                .subjectId("SubjectID" + index)
                .name("Fake Class " + index)
                .numberOfStudents(30L + index)
                .createdDate("2023-11-24")
                .note("This is a fake class for testing " + index)
                .status(1L)
                .lecturerCode("LC00" + index)
                .lecturerName("John Doe " + index)
                .lecturerMail("john.doe" + index + "@example.com")
                .blockName("Block " + index)
                .semesterName("Spring 2023")
                .startDate("2023-01-01")
                .endDate("2023-05-31")
                .subjectCode("SC00" + index)
                .subjectName("Fake Subject " + index)
                .majorId("MajorID30" + index)
                .majorCode("MC00" + index)
                .majorName("Computer Science " + index)
                .numberOfStudentsCurrent(25L + index)
                .numberOfStudentsFailed(2L + index)
                .numberOfStudentsPassed(23L + index)
                .build();
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
            response = generateFakeDataScoreTemplateDto();
        }
        List<ScoreTemplate> scoreTemplateList = new ArrayList<>();

        if (response != null && response.size() > 0) {
            response.stream()
                    .forEach(el -> {
                        if (el.getStatus() != null || el.getStatus() == 1) {
                            if (el.getIndex() != null) {
                                if (request.getScoreRatioMin() != null) {
                                    if (request.getScoreRatioMin() > el.getScoreRatio()) {
                                        return;
                                    }
                                }
                                if (request.getScoreRatioMax() != null) {
                                    if (request.getScoreRatioMax() < el.getScoreRatio()) {
                                        return;
                                    }
                                }
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
                        }
                    });
        }
        return scoreTemplateList;
    }

    public static List<ScoreTemplateDto> generateFakeDataScoreTemplateDto() {
        List<ScoreTemplateDto> fakeDataList = new ArrayList<>();

        for (int i = 1; i <= 5; i++) {
            ScoreTemplateDto fakeData = createFakeScoreTemplateDto(i);
            fakeDataList.add(fakeData);
        }

        return fakeDataList;
    }

    private static ScoreTemplateDto createFakeScoreTemplateDto(int index) {
        return ScoreTemplateDto.builder()
                .id("IDScoreTemplateDto" + index)
                .subjectId("SubjectID" + index)
                .name("Template" + index)
                .scoreType((long) index)
                .minScore(60L)
                .maxScore(100L)
                .scoreRatio(10L + index)
                .createdDate("2023-11-24")
                .status(1L)
                .group("Group" + index)
                .index((long) index)
                .build();
    }

    @Override
    // Call api lấy ra thông tin 1 đầu điểm của một sinh viên
    public List<ScoreTemplateVM> callApiScoreTemplateVM(FilterScoreTemplateVM request) {
        String apiConnect = scoreClassDomain +
                ApiConstants.API_GET_ALL_SCORE_BY_STUDENT_CODE
                + "?StudentCode=" + request.getStudentName()
                + "&idScoreElement=" + request.getScoreTemplateId();

        System.out.println(apiConnect + " aaaaaaaaaaaaaaaaaaaaa");
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
            response = generateFakeDataScoreTemplateVMDto();
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

    public static List<ScoreTemplateVMDto> generateFakeDataScoreTemplateVMDto() {
        List<ScoreTemplateVMDto> fakeDataList = new ArrayList<>();

        for (int i = 1; i <= 5; i++) {
            ScoreTemplateVMDto fakeData = createFakeScoreTemplateVMDto(i);
            fakeDataList.add(fakeData);
        }

        return fakeDataList;
    }

    private static ScoreTemplateVMDto createFakeScoreTemplateVMDto(int index) {
        return ScoreTemplateVMDto.builder()
                .class_StudentId("StudentID" + index)
                .scoreElementId("ElementID" + index)
                .score((long) (50 + index * 5))
                .scoreType((long) index)
                .minScore(60L)
                .maxScore(100L)
                .scoreRatio(10L)
                .createdDate("2023-11-24")
                .name("Template" + index)
                .index((long) index)
                .group("Group" + index)
                .status(1L)
                .scoreElementName("ElementName" + index)
                .build();
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
