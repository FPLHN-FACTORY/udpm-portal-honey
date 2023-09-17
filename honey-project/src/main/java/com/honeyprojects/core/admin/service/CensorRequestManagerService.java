package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.CensorChangeStatusRequest;
import com.honeyprojects.core.admin.model.request.CensorSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.CensorAddHoneyRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorDetailRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorTransactionRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorUserApiResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.History;

public interface CensorRequestManagerService {
    History changeStatus(CensorChangeStatusRequest changeStatusRequest);

    PageableObject<CensorAddHoneyRequestResponse> getHistoryAddPoint(
            CensorSearchHistoryRequest historyRequest);

    PageableObject<CensorTransactionRequestResponse> getHistoryTransaction(
            CensorSearchHistoryRequest historyRequest);

    //UserAPi

    CensorUserApiResponse getUserApiByCode(String code);

    CensorUserApiResponse getUserApiById(String id);

    CensorDetailRequestResponse getRequest(String idRequest);

    Integer countRequest(Integer type);
}
