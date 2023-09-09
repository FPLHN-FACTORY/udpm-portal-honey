package com.honeyprojects.core.teacher.service.impl;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.teacher.model.request.TeacherAddPointRequest;
import com.honeyprojects.core.teacher.model.request.TeacherChangeStatusRequest;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.request.TeacherSearchHistoryRequest;
import com.honeyprojects.core.teacher.model.request.TeacherStudentRequest;
import com.honeyprojects.core.teacher.model.response.TeacherAddHoneyHistoryResponse;
import com.honeyprojects.core.teacher.model.response.TeacherCategoryResponse;
import com.honeyprojects.core.teacher.model.response.TeacherPointResponse;
import com.honeyprojects.core.teacher.model.response.TeacherStudentResponse;
import com.honeyprojects.core.teacher.repository.TeacherCategoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHistoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHoneyRepository;
import com.honeyprojects.core.teacher.repository.TeacherStudentRepository;
import com.honeyprojects.core.teacher.repository.TeacherUserSemesterRepository;
import com.honeyprojects.core.teacher.service.TeacherAddPointService;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
public class TeacherAddPointServiceImpl implements TeacherAddPointService {

    @Autowired
    private TeacherCategoryRepository categoryRepository;
    @Autowired
    private TeacherStudentRepository studentRepository;
    @Autowired
    private TeacherHoneyRepository honeyRepository;
    @Autowired
    private TeacherHistoryRepository historyRepository;
    @Autowired
    private TeacherUserSemesterRepository usRepository;

    @Override
    public List<TeacherCategoryResponse> getCategory() {
        return categoryRepository.getAllCategory();
    }

    @Override
    public TeacherStudentResponse getStudent(TeacherStudentRequest studentRequset) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        return studentRepository.getStudent(studentRequset, dateNow);
    }

    @Override
    public TeacherPointResponse getPointStudent(TeacherGetPointRequest getPointRequest) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        TeacherPointResponse pointResponse = honeyRepository.getPoint(getPointRequest, dateNow);
        return pointResponse;
    }

    @Override
    public PageableObject<TeacherAddHoneyHistoryResponse> getHistory(TeacherSearchHistoryRequest historyRequest) {
        Pageable pageable = PageRequest.of(historyRequest.getPage(), historyRequest.getSize());
        return new PageableObject<>(historyRepository.getHistory(historyRequest, pageable));
    }

    @Override
    public History changeStatus(TeacherChangeStatusRequest changeReq) {
        History history = historyRepository.findById(changeReq.getIdHistory()).get();
        history.setStatus(HoneyStatus.values()[changeReq.getStatus()]);
        return historyRepository.save(history);
    }

    @Override
    public History addPoint(TeacherAddPointRequest addPointRequest) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();

        History history = new History();
        history.setStatus(HoneyStatus.CHO_PHE_DUYET);
        history.setTeacherId(addPointRequest.getTeacherId());
        history.setHoneyPoint(addPointRequest.getHoneyPoint());
        history.setNote(addPointRequest.getNote());
        history.setType("0");
        history.setCreatedAt(dateNow);
        if (addPointRequest.getHoneyId() == null || addPointRequest.getHoneyId().isBlank()) {
            String idUs = usRepository.getUsByStudent(addPointRequest.getStudentId(), dateNow);
            if (idUs == null) return null;
            Honey honey = new Honey();
            honey.setStatus(Status.HOAT_DONG);
            honey.setHoneyPoint(0);
            honey.setStudentId(addPointRequest.getStudentId());
            honey.setHoneyCategoryId(addPointRequest.getCategoryId());
            honey.setUserSemesterId(idUs);
            history.setHoneyId(honeyRepository.save(honey).getId());
        } else {
            Honey honey = honeyRepository.findById(addPointRequest.getHoneyId()).orElseThrow();
            history.setHoneyId(honey.getId());
        }
        history.setStudentId(addPointRequest.getStudentId());
        return historyRepository.save(history);
    }
}
