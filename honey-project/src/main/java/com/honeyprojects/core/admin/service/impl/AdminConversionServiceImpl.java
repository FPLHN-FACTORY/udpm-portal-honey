package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminConversionRequest;
import com.honeyprojects.core.admin.model.request.AdminSearchConversionRequest;
import com.honeyprojects.core.admin.model.response.AdminConversionResponse;
import com.honeyprojects.core.admin.repository.AdConversionRepository;
import com.honeyprojects.core.admin.service.AdminConversionService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Conversion;
import com.honeyprojects.infrastructure.contant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminConversionServiceImpl implements AdminConversionService {

    @Autowired
    private AdConversionRepository adConversionRepository;

    @Override
    public List<AdminConversionResponse> getAllConversion() {
        return adConversionRepository.getAllListResponse();
    }

    @Override
    @Transactional
    public Conversion addConversion(AdminConversionRequest request) {
        Conversion conversion = new Conversion();
        conversion.setCode(request.getCode());
        conversion.setRatio(request.getRatio());
        conversion.setCategoryId(request.getCategoryId());
        conversion.setStatus(Status.HOAT_DONG);
        return adConversionRepository.save(conversion);
    }

    @Override
    public Conversion getOneConversion(String id) {
        return adConversionRepository.findById(id).orElse(null);
    }

    @Override
    public Page<AdminConversionResponse> searchConversion(Integer page, String name) {
        Pageable pageable = PageRequest.of(page, 5);
        return adConversionRepository.SearchByName(pageable, name);
    }

    @Override
    public PageableObject<AdminConversionResponse> getPage(AdminSearchConversionRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        return new PageableObject<>(adConversionRepository.getPageListResponse(pageable, request));
    }

    @Override
    @Transactional
    public Conversion updateConversion(AdminConversionRequest request, String id) {
        Conversion getOne = adConversionRepository.findById(id).orElse(null);
        if (getOne != null) {
            getOne.setCode(request.getCode());
            getOne.setRatio(request.getRatio());
            getOne.setCategoryId(request.getCategoryId());
            return adConversionRepository.save(getOne);
        } else {
            return null;
        }
    }

    @Override
    public Conversion getConversion(String code) {
        return adConversionRepository.findByCodeAndStatus(code, Status.HOAT_DONG);
    }
}
