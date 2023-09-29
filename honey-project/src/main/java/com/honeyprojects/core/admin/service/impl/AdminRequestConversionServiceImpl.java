package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminConversionRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateConversionHistoryRequest;
import com.honeyprojects.core.admin.model.response.AdminRequestConversionHistoryResponse;
import com.honeyprojects.core.admin.repository.AdRequestConversionHistoryRepository;
import com.honeyprojects.core.admin.service.AdminRequestConversionService;
import com.honeyprojects.core.common.base.PageableObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AdminRequestConversionServiceImpl implements AdminRequestConversionService {

    @Autowired
    private AdRequestConversionHistoryRepository historyRepository;
    @Override
    public PageableObject<AdminRequestConversionHistoryResponse> getHistoryConversionAdmin(AdminCreateConversionHistoryRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        return new PageableObject<>( historyRepository.getHistory(request,pageable));
    }
}
