package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminAddPointRequest;
import com.honeyprojects.core.admin.model.request.AdminChangeStatusRequest;
import com.honeyprojects.core.admin.model.request.AdminGetPointRequest;
import com.honeyprojects.core.admin.model.request.AdminSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.AdminAddHoneyHistoryResponse;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminPoinResponse;
import com.honeyprojects.core.admin.repository.AdSemesterRepository;
import com.honeyprojects.core.admin.repository.AdminCategoryRepository;
import com.honeyprojects.core.admin.repository.AdminHistoryRepository;
import com.honeyprojects.core.admin.repository.AdminHoneyRepository;
import com.honeyprojects.core.admin.service.AdminAddPointService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
public class AdminAddPointServiceImpl implements AdminAddPointService {


    @Autowired
    private AdminCategoryRepository categoryRepository;
    @Autowired
    private AdminHoneyRepository honeyRepository;
    @Autowired
    private AdminHistoryRepository historyRepository;
    @Autowired
    private AdSemesterRepository usRepository;
    @Autowired
    private UdpmHoney udpmHoney;
    @Autowired
    private ConvertRequestApiidentity requestApiidentity;

    @Override
    public List<AdminCategoryResponse> getCategory() {
        return categoryRepository.getAllListCategory();
    }

    @Override
    public AdminPoinResponse getPointStudent(AdminGetPointRequest getPointRequest) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        return honeyRepository.getPoint(getPointRequest, dateNow);
    }

    @Override
    public PageableObject<AdminAddHoneyHistoryResponse> getHistory(AdminSearchHistoryRequest historyRequest) {
        Pageable pageable = PageRequest.of(historyRequest.getPage(), historyRequest.getSize());
        String idAdmin = udpmHoney.getIdUser();
        historyRequest.setIdAdmin(idAdmin);
        return new PageableObject<>(historyRepository.getHistory(historyRequest, pageable));
    }

    @Override
    public PageableObject<AdminAddHoneyHistoryResponse> getListRequest(AdminSearchHistoryRequest historyRequest) {
        Pageable pageable = PageRequest.of(historyRequest.getPage(), historyRequest.getSize());
        String idAdmin = udpmHoney.getIdUser();
        historyRequest.setIdAdmin(idAdmin);
        return new PageableObject<>(historyRepository.getListRequest(historyRequest, pageable));
    }

    @Override
    public History changeStatus(AdminChangeStatusRequest changeStatusRequest) {
        History history = historyRepository.findById(changeStatusRequest.getIdHistory()).get();
        history.setStatus(HoneyStatus.values()[changeStatusRequest.getStatus()]);
        return historyRepository.save(history);
    }

    @Override
    public History addPoint(AdminAddPointRequest addPointRequest) {
        //fake admin login
        String idAdmin = udpmHoney.getIdUser();
        System.out.println(idAdmin);
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        History history = new History();
        history.setStatus(HoneyStatus.DA_PHE_DUYET);
        history.setTeacherId(idAdmin);
        history.setHoneyPoint(addPointRequest.getHoneyPoint());
        history.setNote(addPointRequest.getNote());
        history.setType(TypeHistory.CONG_DIEM);
        history.setCreatedAt(dateNow);
        if (addPointRequest.getHoneyId() == null) {

            String idUs = usRepository.getUsByStudent(dateNow);
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