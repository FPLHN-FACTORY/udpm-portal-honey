package com.honeyprojects.core.president.service;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.president.model.request.PresidentFindGiftHistoryRequest;
import com.honeyprojects.core.president.model.request.PresidentFindHoneyHistoryRequest;
import com.honeyprojects.core.president.model.response.PresidentGiftHistoryResponse;
import com.honeyprojects.core.president.model.response.PresidentHoneyHistoryResponse;

public interface PresidentHistoryService {

    PageableObject<PresidentHoneyHistoryResponse> getHoneyHistory(PresidentFindHoneyHistoryRequest request);

    PageableObject<PresidentGiftHistoryResponse> getGiftHistory(PresidentFindGiftHistoryRequest request);

    PageableObject<PresidentHoneyHistoryResponse> getHoneyRequest(PresidentFindGiftHistoryRequest request);

    PageableObject<PresidentGiftHistoryResponse> getGiftRequest(PresidentFindGiftHistoryRequest request);

}
