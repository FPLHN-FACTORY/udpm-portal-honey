package com.honeyprojects.core.teacher.service.impl;

import com.honeyprojects.core.admin.model.response.AdminConversionResponse;
import com.honeyprojects.core.admin.repository.CensorUserAPIRepository;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.teacher.model.request.TeacherConvertionHoneyRequest;
import com.honeyprojects.core.teacher.repository.TeacherGetHoneyRepository;
import com.honeyprojects.core.teacher.repository.TeacherHistoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherShowConvertionRepository;
import com.honeyprojects.core.teacher.repository.TeacherUserSemesterRepository;
import com.honeyprojects.core.teacher.service.TeacherConvertionHoneyService;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.PaginationConstant;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.Calendar;

@Service
@Validated
public class TeacherConvertionHoneyServiceImpl implements TeacherConvertionHoneyService {

    @Autowired
    private TeacherHistoryRepository teacherHistoryRepository;
    @Autowired
    private TeacherUserSemesterRepository usRepository;
    @Autowired
    private CensorUserAPIRepository userRepository;
    @Autowired
    private TeacherGetHoneyRepository honeyRepository;
    @Autowired
    private TeacherShowConvertionRepository showConvertionRepository;

    @Override
    @Transactional
    public History addConvertion(@Valid TeacherConvertionHoneyRequest convertionHoneyRequest) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        Honey honey = honeyRepository.findByStudentIdAndHoneyCategoryId(convertionHoneyRequest.getStudentId(), convertionHoneyRequest.getCategoryId());
        if (honey == null) {
            String idUs = usRepository.getUsByStudent(convertionHoneyRequest.getStudentId(), dateNow);
            if (idUs == null) return null;
            honey = new Honey();
            honey.setStatus(Status.HOAT_DONG);
            honey.setStudentId(convertionHoneyRequest.getStudentId());
            honey.setHoneyCategoryId(convertionHoneyRequest.getCategoryId());
            honey.setUserSemesterId(idUs);
        } else {
            int deductedPoints = convertionHoneyRequest.getHoneyPoint();
            honey.setHoneyPoint(honey.getHoneyPoint() - deductedPoints);
        }
        String idTeacher = userRepository.findAll().get(0).getId();
        History history = new History();
        history.setStatus(HoneyStatus.DA_PHE_DUYET);
        history.setHoneyId(honeyRepository.save(honey).getId());
        history.setTeacherId(idTeacher);
        history.setHoneyPoint(convertionHoneyRequest.getHoneyPoint());
        history.setType(TypeHistory.DOI_QUA);
        history.setGiftId(convertionHoneyRequest.getGiftId());
        history.setCreatedAt(dateNow);
        history.setHoneyId(honey.getId());
        history.setStudentId(convertionHoneyRequest.getStudentId());
        return teacherHistoryRepository.save(history);
    }

    @Override
    public PageableObject<AdminConversionResponse> listConvertion(String categoryId) {
        Pageable pageable = PageRequest.of(PaginationConstant.DEFAULT_PAGE, PaginationConstant.DEFAULT_SIZE);
        Page<AdminConversionResponse> res = showConvertionRepository.getPageListResponse(pageable, categoryId);
        return new PageableObject<>(res);
    }

}
