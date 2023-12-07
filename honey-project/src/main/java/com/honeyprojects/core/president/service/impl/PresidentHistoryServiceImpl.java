package com.honeyprojects.core.president.service.impl;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.president.model.request.PresidentFindGiftHistoryRequest;
import com.honeyprojects.core.president.model.request.PresidentFindHoneyHistoryRequest;
import com.honeyprojects.core.president.model.response.PresidentGiftHistoryResponse;
import com.honeyprojects.core.president.model.response.PresidentHoneyHistoryResponse;
import com.honeyprojects.core.president.repository.PresidentHistoryRepository;
import com.honeyprojects.core.president.service.PresidentHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PresidentHistoryServiceImpl implements PresidentHistoryService {

    @Autowired
    private PresidentHistoryRepository presidentHistoryRepository;

    @Autowired
    private UdpmHoney udpmHoney;

    @Override
    public PageableObject<PresidentHoneyHistoryResponse> getHoneyHistory(PresidentFindHoneyHistoryRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        String id = udpmHoney.getIdUser();
        return new PageableObject<>(presidentHistoryRepository.getHoneyHistory(request, pageable, id));
    }

    @Override
    public PageableObject<PresidentGiftHistoryResponse> getGiftHistory(PresidentFindGiftHistoryRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        String id = udpmHoney.getIdUser();
        return new PageableObject<>(presidentHistoryRepository.getGiftHistory(request, pageable, id));
    }
}
