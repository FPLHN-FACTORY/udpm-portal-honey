package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminAddPointRequest;
import com.honeyprojects.core.admin.model.request.AdminChangeStatusRequest;
import com.honeyprojects.core.admin.model.request.AdminGetPointRequest;
import com.honeyprojects.core.admin.model.request.AdminSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.AdminAddHoneyHistoryResponse;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminPoinResponse;
import com.honeyprojects.core.admin.repository.AdHistoryDetailRepository;
import com.honeyprojects.core.admin.repository.AdminCategoryRepository;
import com.honeyprojects.core.admin.repository.AdminHistoryRepository;
import com.honeyprojects.core.admin.repository.AdminHoneyRepository;
import com.honeyprojects.core.admin.service.AdminAddPointService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.HistoryDetail;
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
    private AdHistoryDetailRepository historyDetailRandomRepository;

    @Autowired
    private UdpmHoney udpmHoney;

    @Autowired
    private ConvertRequestApiidentity requestApiidentity;

    @Override
    public List<AdminCategoryResponse> getCategory() {
        return categoryRepository.getAllCategory();
    }

    @Override
    public AdminPoinResponse getPointStudent(AdminGetPointRequest getPointRequest) {
        return honeyRepository.getPoint(getPointRequest);
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
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        History history = new History();
        history.setNote(addPointRequest.getNote());
        history.setType(TypeHistory.CONG_DIEM);
        history.setChangeDate(dateNow);
        history.setStatus(HoneyStatus.ADMIN_DA_THEM);
        historyRepository.save(history);

        HistoryDetail historyDetail = new HistoryDetail();
        historyDetail.setHistoryId(history.getId());
        historyDetail.setHoneyPoint(addPointRequest.getHoneyPoint());
        historyDetail.setStudentId(addPointRequest.getStudentId());

        if (addPointRequest.getHoneyId() == null) {
            Honey honey = new Honey();
            honey.setStatus(Status.HOAT_DONG);
            honey.setHoneyPoint(addPointRequest.getHoneyPoint());
            honey.setStudentId(addPointRequest.getStudentId());
            honey.setHoneyCategoryId(addPointRequest.getCategoryId());
            honeyRepository.save(honey);
            historyDetail.setHoneyId(honey.getId());
        } else {
            Honey honey = honeyRepository.findById(addPointRequest.getHoneyId()).orElseThrow();
            honey.setHoneyPoint(addPointRequest.getHoneyPoint() + honey.getHoneyPoint());
            honeyRepository.save(honey);
            historyDetail.setHoneyId(honey.getId());
        }
        historyDetailRandomRepository.save(historyDetail);
        return history;
    }

    @Override
    public SimpleResponse searchUser(String username) {
        return requestApiidentity.handleCallApiGetUserByEmailOrUsername(username);
    }

    @Override
    public SimpleResponse getUserById(String id) {
        return requestApiidentity.handleCallApiGetUserById(id);
    }


}
