package com.honeyprojects.core.teacher.service.impl;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.teacher.model.request.TeacherAddPointRequest;
import com.honeyprojects.core.teacher.model.request.TeacherChangeStatusRequest;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.request.TeacherSearchHistoryRequest;
import com.honeyprojects.core.teacher.model.response.TeacherAddHoneyHistoryResponse;
import com.honeyprojects.core.teacher.model.response.TeacherCategoryResponse;
import com.honeyprojects.core.teacher.model.response.TeacherPointResponse;
import com.honeyprojects.core.teacher.repository.TeacherCategoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHistoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHoneyRepository;
import com.honeyprojects.core.teacher.repository.TeacherNotificationRepository;
import com.honeyprojects.core.teacher.service.TeacherAddPointExcelService;
import com.honeyprojects.core.teacher.service.TeacherAddPointService;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.*;
import com.honeyprojects.util.ConvertRequestApiidentity;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Service
public class TeacherAddPointServiceImpl implements TeacherAddPointService {

    @Autowired
    private TeacherCategoryRepository categoryRepository;

    @Autowired
    private TeacherHoneyRepository honeyRepository;

    @Autowired
    private TeacherHistoryRepository historyRepository;

    @Autowired
    private TeacherNotificationRepository teacherNotificationRepository;

    @Autowired
    private UdpmHoney udpmHoney;

    @Autowired
    private ConvertRequestApiidentity requestApiidentity;



    @Override
    public List<TeacherCategoryResponse> getCategory() {
        return categoryRepository.getAllCategory();
    }

    @Override
    public TeacherPointResponse getPointStudent(TeacherGetPointRequest getPointRequest) {
        return honeyRepository.getPoint(getPointRequest);
    }

    @Override
    public PageableObject<TeacherAddHoneyHistoryResponse> getHistory(TeacherSearchHistoryRequest historyRequest) {
        Pageable pageable = PageRequest.of(historyRequest.getPage(), historyRequest.getSize());
        String idTeacher = udpmHoney.getIdUser();
        historyRequest.setIdTeacher(idTeacher);
        return new PageableObject<>(historyRepository.getHistory(historyRequest, pageable));
    }

    @Override
    public PageableObject<TeacherAddHoneyHistoryResponse> getListRequest(TeacherSearchHistoryRequest historyRequest) {
        Pageable pageable = PageRequest.of(historyRequest.getPage(), historyRequest.getSize());
        String idTeacher = udpmHoney.getIdUser();
        historyRequest.setIdTeacher(idTeacher);
        return new PageableObject<>(historyRepository.getListRequest(historyRequest, pageable));
    }

    @Override
    public History changeStatus(TeacherChangeStatusRequest changeReq) {
        History history = historyRepository.findById(changeReq.getIdHistory()).get();
        history.setStatus(HoneyStatus.values()[changeReq.getStatus()]);
        return historyRepository.save(history);
    }

    @Override
    @Transactional
    public History addPoint(TeacherAddPointRequest addPointRequest) {
        //fake teacher login
        String idTeacher = udpmHoney.getIdUser();

        Long dateNow = Calendar.getInstance().getTimeInMillis();

        History history = new History();
        history.setStatus(HoneyStatus.CHO_PHE_DUYET);
        history.setTeacherId(idTeacher);
//        history.setHoneyPoint(addPointRequest.getHoneyPoint());
        history.setNote(addPointRequest.getNote());
        history.setType(TypeHistory.CONG_DIEM);
        history.setCreatedAt(dateNow);
        if (addPointRequest.getHoneyId() == null) {
            Honey honey = new Honey();
            honey.setStatus(Status.HOAT_DONG);
            honey.setHoneyPoint(0);
            honey.setStudentId(addPointRequest.getStudentId());
            honey.setHoneyCategoryId(addPointRequest.getCategoryId());
//            history.setHoneyId(honeyRepository.save(honey).getId());
        } else {
            Honey honey = honeyRepository.findById(addPointRequest.getHoneyId()).orElseThrow();
//            history.setHoneyId(honey.getId());
        }
        history.setStudentId(addPointRequest.getStudentId());

        History his = historyRepository.save(history);

        Optional<Category> ca = categoryRepository.findById(addPointRequest.getCategoryId());

        Notification notification = new Notification();
        notification.setTitle("Yêu cầu cộng "+addPointRequest.getHoneyPoint()+" mật ong loại "+ca.get().getName()+" cho sinh viên");
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setType(NotificationType.CHO_PHE_DUYET);
        notification.setStudentId(history.getId());

        teacherNotificationRepository.save(notification);

        return his;
    }

    @Override
    public SimpleResponse searchUser(String username) {
        String email = username + "@fpt.edu.vn";
        return requestApiidentity.handleCallApiGetUserByEmail(email);
    }

    @Override
    public SimpleResponse getUserById(String id) {
        return requestApiidentity.handleCallApiGetUserById(id);
    }
}
