package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateConversionRequest;
import com.honeyprojects.core.admin.model.request.AdminSearchConversionRequest;
import com.honeyprojects.core.admin.model.response.AdminConversionResponse;
import com.honeyprojects.core.admin.repository.AdConversionRepository;
import com.honeyprojects.core.admin.service.AdminConversionService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Conversion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminConversionServiceImpl implements AdminConversionService {

    @Autowired
    AdConversionRepository adConversionRepository;
    @Override
    public List<AdminConversionResponse> getAllConversion() {
        return adConversionRepository.getAllListResponse();
    }

    @Override
    public Conversion addConversion(AdminCreateConversionRequest request) {

        Conversion conversion = new Conversion();
        conversion.setCode(request.getCode());
        conversion.setRatio(request.getRatio());
        conversion.setGift_id(request.getGiftId());
        conversion.setCategory_id(request.getCategoryId());
        return adConversionRepository.save(conversion);
    }

    @Override
    public Conversion getOneConversion(String id) {
        return adConversionRepository.findById(id).orElse(null);
    }

    @Override
    public Page<AdminConversionResponse> searchConversion(Integer page, String name) {
        Pageable pageable = PageRequest.of(page,5);
        return adConversionRepository.SearchByName(pageable,name);
    }

    @Override
    public PageableObject<AdminConversionResponse> getPage(AdminSearchConversionRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<AdminConversionResponse>res = adConversionRepository.getPageListResponse(pageable , request);
        return new PageableObject<>(res);
    }

    @Override
    public Conversion updateConversion(AdminCreateConversionRequest request, String id) {
        Conversion getOne = adConversionRepository.findById(id).orElse(null);
        if(getOne != null){
                getOne.setCode(request.getCode());
                getOne.setRatio(request.getRatio());
                getOne.setGift_id(request.getGiftId());
                getOne.setCategory_id(request.getCategoryId());
                return adConversionRepository.save(getOne);
        }else {
          return null;
        }


    }
}
