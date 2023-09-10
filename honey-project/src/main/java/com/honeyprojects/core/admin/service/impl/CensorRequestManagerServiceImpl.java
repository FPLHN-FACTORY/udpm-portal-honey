package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.CensorChangeStatusRequest;
import com.honeyprojects.core.admin.model.request.CensorSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.CensorAddHoneyRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorDetailRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorUserApiResponse;
import com.honeyprojects.core.admin.repository.AdHoneyRepository;
import com.honeyprojects.core.admin.repository.CensorHistoryRepository;
import com.honeyprojects.core.admin.repository.CensorUserAPIRepository;
import com.honeyprojects.core.admin.service.CensorRequestManagerService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service
public class CensorRequestManagerServiceImpl implements CensorRequestManagerService {

    @Autowired
    private CensorHistoryRepository historyRepository;

    @Autowired
    private AdHoneyRepository honeyRepository;

    @Override
    public History changeStatus(CensorChangeStatusRequest changeReq) {
        History history = historyRepository.findById(changeReq.getIdHistory()).get();
        history.setStatus(HoneyStatus.values()[changeReq.getStatus()]);
        if (changeReq.getStatus() == 1) {
            Long dateNow = Calendar.getInstance().getTimeInMillis();
            Honey honey = honeyRepository.findById(history.getHoneyId()).get();
            System.out.println(honey.getHoneyPoint());
            honey.setHoneyPoint(honey.getHoneyPoint() + history.getHoneyPoint());

            System.out.println(honey.getHoneyPoint());
            honeyRepository.save(honey);
            history.setChangeDate(dateNow);
        }
        ;
        return historyRepository.save(history);
    }

    @Override
    public PageableObject<CensorAddHoneyRequestResponse> getHistory(CensorSearchHistoryRequest historyRequest) {
        Pageable pageable = PageRequest.of(historyRequest.getPage(), historyRequest.getSize());
        return new PageableObject<>(historyRepository.getHistoryAddPoint(historyRequest, pageable));
    }

    @Override
    public CensorDetailRequestResponse getRequest(String idRequest) {
        return historyRepository.getAddPointRequest(idRequest);
    }

    //UserApi

    @Autowired
    private CensorUserAPIRepository userAPIRepository;

    @Override
    public CensorUserApiResponse getUserApiByCode(String code) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        return userAPIRepository.getUserApiByCode(code, dateNow);
    }

    @Override
    public CensorUserApiResponse getUserApiById(String id) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        return userAPIRepository.getUserApiById(id, dateNow);
    }


}
