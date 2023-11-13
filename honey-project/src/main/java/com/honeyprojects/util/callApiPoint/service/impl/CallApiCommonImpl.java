package com.honeyprojects.util.callApiPoint.service.impl;

import com.honeyprojects.infrastructure.apiconstants.ApiConstants;
import com.honeyprojects.infrastructure.apiconstants.HonneyConstants;
import com.honeyprojects.infrastructure.contant.SessionConstant;
import com.honeyprojects.infrastructure.session.HoneySession;
import com.honeyprojects.util.callApiPoint.model.request.FilterClassSubject;
import com.honeyprojects.util.callApiPoint.model.request.FilterScoreTemplate;
import com.honeyprojects.util.callApiPoint.model.request.FilterScoreTemplateVM;
import com.honeyprojects.util.callApiPoint.model.response.ClassSubjectVM;
import com.honeyprojects.util.callApiPoint.model.response.RoleIdentityResponse;
import com.honeyprojects.util.callApiPoint.model.response.ScoreTemplate;
import com.honeyprojects.util.callApiPoint.model.response.ScoreTemplateVM;
import com.honeyprojects.util.callApiPoint.service.CallApiCommonService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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

    @Override
    // Call api lấy ra danh sách lớp học và môn
    public List<ClassSubjectVM> callApiClassSubjectVM(FilterClassSubject request) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        // Kiểm tra xem request có đủ dữ liệu truyền vào không
        Set<ConstraintViolation<FilterClassSubject>> violations = validator.validate(request);

        if (!violations.isEmpty()) {
            // Nếu có lỗi, bạn có thể xử lý tùy theo yêu cầu, ví dụ: ném một ngoại lệ hoặc trả về kết quả khác.
            throw new IllegalArgumentException("Request không hợp lệ: " + violations.toString());
        }

        List<ClassSubjectVM> classSubjectList = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            ClassSubjectVM classSubject = new ClassSubjectVM();
            classSubject.setClassName("Tên lớp " + i);
            classSubject.setClassId("ID lớp " + i);
            classSubject.setSubjectName("Tên môn học " + i);
            classSubject.setSubjectId("ID môn học " + i);
            classSubject.setTeacherEmail("Email giáo viên " + i);

            classSubjectList.add(classSubject);
        }
        return classSubjectList;
    }

    @Override
    // Call api lấy ra danh sách đầu điểm của lớp
    public List<ScoreTemplate> callApiScoreTemplate(FilterScoreTemplate request) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        // Kiểm tra xem request có đủ dữ liệu truyền vào không
        Set<ConstraintViolation<FilterScoreTemplate>> violations = validator.validate(request);

        if (!violations.isEmpty()) {
            // Nếu có lỗi, bạn có thể xử lý tùy theo yêu cầu, ví dụ: ném một ngoại lệ hoặc trả về kết quả khác.
            throw new IllegalArgumentException("Request không hợp lệ: " + violations.toString());
        }

        List<ScoreTemplate> scoreTemplateList = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            ScoreTemplate scoreTemplate = new ScoreTemplate();
            scoreTemplate.setScoreTemplateEmail("Email bảng điểm " + i);
            scoreTemplate.setScoreTemplateId("ID bảng điểm " + i);

            scoreTemplateList.add(scoreTemplate);
        }

        return scoreTemplateList;
    }

    @Override
    // Call api lấy ra thông tin 1 đầu điểm của một sinh viên
    public ScoreTemplateVM callApiScoreTemplateVM(FilterScoreTemplateVM request) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        // Kiểm tra xem request có đủ dữ liệu truyền vào không
        Set<ConstraintViolation<FilterScoreTemplateVM>> violations = validator.validate(request);

        if (!violations.isEmpty()) {
            // Nếu có lỗi, bạn có thể xử lý tùy theo yêu cầu, ví dụ: ném một ngoại lệ hoặc trả về kết quả khác.
            throw new IllegalArgumentException("Request không hợp lệ: " + violations.toString());
        }

        ScoreTemplateVM scoreTemplateVM = new ScoreTemplateVM();
        scoreTemplateVM.setScoreTemplateName("Tên bảng điểm " + request.getScoreTemplateId());
        scoreTemplateVM.setScoreTemplatePoint(9.5);

        return scoreTemplateVM;
    }

    @Override
    public boolean checkRoleIdentity() {
        String apiConnect = identityDomain +
                ApiConstants.API_GET_ALL_USER_BY_ROLE_AND_MODULE
                + session.getAttribute(SessionConstant.ID_USER)
                + "/" + HonneyConstants.MODULE_CODE;
        HttpHeaders headers = new HttpHeaders();
        String authorizationToken = "Bearer " + honeySession.getToken();
        headers.set("Authorization", authorizationToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Object> httpEntity = new HttpEntity<>(headers);
        ResponseEntity<List<RoleIdentityResponse>> responseEntity =
                restTemplate.exchange(apiConnect, HttpMethod.GET, httpEntity,
                        new ParameterizedTypeReference<List<RoleIdentityResponse>>() {
                        });

        List<RoleIdentityResponse> response = responseEntity.getBody();
        List<SimpleGrantedAuthority> authorities = (List<SimpleGrantedAuthority>) session.getAttribute(SessionConstant.ROLES);
        boolean allAuthoritiesPresent = authorities.stream()
                .allMatch(authority -> response.stream()
                        .anyMatch(responseAuthority -> responseAuthority.getRoleCode().equals(authority.getAuthority())));

        return allAuthoritiesPresent;
    }

}
