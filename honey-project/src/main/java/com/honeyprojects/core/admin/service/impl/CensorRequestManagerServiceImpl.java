package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.CensorChangeStatusRequest;
import com.honeyprojects.core.admin.model.request.CensorSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.CensorAddHoneyRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorDetailRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorTransactionRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorUserApiResponse;
import com.honeyprojects.core.admin.repository.AdHoneyRepository;
import com.honeyprojects.core.admin.repository.CensorHistoryRepository;
import com.honeyprojects.core.admin.repository.CensorUserAPIRepository;
import com.honeyprojects.core.admin.service.CensorRequestManagerService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.Message;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;

@Service
public class CensorRequestManagerServiceImpl implements CensorRequestManagerService {

    @Autowired
    private CensorHistoryRepository historyRepository;

    @Autowired
    private AdHoneyRepository honeyRepository;

    @Autowired
    private ConvertRequestApiidentity requestApiidentity;

    @Override
    @Transactional
    public History changeStatus(CensorChangeStatusRequest changeReq) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        History history = historyRepository.findById(changeReq.getIdHistory()).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));
        history.setStatus(HoneyStatus.values()[changeReq.getStatus()]);
        if (changeReq.getStatus() == 1 && history.getType().equals(TypeHistory.CONG_DIEM)) {
            Honey honey = honeyRepository.findById(history.getHoneyId()).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));
            honey.setHoneyPoint(honey.getHoneyPoint() + history.getHoneyPoint());

            honeyRepository.save(honey);
            history.setChangeDate(dateNow);
        } else if (changeReq.getStatus() == 1 && history.getType().equals(TypeHistory.GIAO_DICH)) {
            //lay ra honey cua nguoi gui
            Honey honey = honeyRepository.findById(history.getHoneyId())
                    .orElseThrow(() -> new RestApiException(Message.HONEY_NOT_EXIST));
            //tru honey cua nguoi gui
            honey.setHoneyPoint(honey.getHoneyPoint() - history.getHoneyPoint());

            //lay ra honey cua nguoi nhan
            Honey honeyNhan = honeyRepository.getPoint(history.getStudentId(),
                    honey.getHoneyCategoryId(), honey.getUserSemesterId());
            honeyRepository.save(honey);
            //kiem tra neu honey nguoi nhan khong ton tai se tao moi
            if (honeyNhan == null) {
                honeyNhan = new Honey();
                honeyNhan.setHoneyPoint(0);
                honeyNhan.setHoneyCategoryId(honey.getHoneyCategoryId());
                honeyNhan.setStudentId(history.getStudentId());
                honeyNhan.setUserSemesterId(honey.getUserSemesterId());
            }
            //cong them honey cho nguoi nhan
            honeyNhan.setHoneyPoint(honeyNhan.getHoneyPoint() + history.getHoneyPoint());
            honeyRepository.save(honeyNhan);

            history.setChangeDate(dateNow);
        }
        return historyRepository.save(history);
    }

    @Override
    public History changeStatusConversion(CensorChangeStatusRequest request) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        History history = historyRepository.findById(request.getIdHistory()).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));
        history.setStatus(HoneyStatus.values()[request.getStatus()]);
        if (history.getStatus().equals(HoneyStatus.DA_PHE_DUYET) && history.getType().equals(TypeHistory.DOI_QUA)) {
            Honey honey = honeyRepository.findById(history.getHoneyId()).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));
            honey.setHoneyPoint(honey.getHoneyPoint() - history.getHoneyPoint());

            honeyRepository.save(honey);
            history.setChangeDate(dateNow);
        }
        return historyRepository.save(history);
    }

    @Override
    public PageableObject<CensorAddHoneyRequestResponse> getHistoryAddPoint(CensorSearchHistoryRequest historyRequest) {
        Pageable pageable = PageRequest.of(historyRequest.getPage(), historyRequest.getSize());
        return new PageableObject<>(historyRepository.getHistoryAddPoint(historyRequest, pageable));
    }

    @Override
    public PageableObject<CensorTransactionRequestResponse> getHistoryTransaction(CensorSearchHistoryRequest historyRequest) {
        Pageable pageable = PageRequest.of(historyRequest.getPage(), historyRequest.getSize());
        return new PageableObject<>(historyRepository.getHistoryTransaction(historyRequest, pageable));
    }

    @Override
    public CensorDetailRequestResponse getRequest(String idRequest) {
        History history = historyRepository.findById(idRequest).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));
        if (history.getType().equals(TypeHistory.CONG_DIEM)) {
            return historyRepository.getAddPointRequest(idRequest);
        } else if (history.getType().equals(TypeHistory.GIAO_DICH)) {
            return historyRepository.getTransactionRequest(idRequest);
        }
        return null;
    }

    @Override
    public Integer countRequest(Integer type) {
        TypeHistory honeyStatus = null;
        if (type != null) honeyStatus = TypeHistory.values()[type];
        return historyRepository.getCountRequest(honeyStatus);
    }

    //UserApi

    @Autowired
    private CensorUserAPIRepository userAPIRepository;


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
