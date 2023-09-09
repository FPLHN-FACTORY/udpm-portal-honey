package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateConversionRequest;
import com.honeyprojects.core.admin.repository.AdConversionRepository;
import com.honeyprojects.core.admin.service.AdminConversionService;
import com.honeyprojects.entity.Conversion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class AdminConversionServiceImpl implements AdminConversionService {

    @Autowired
    AdConversionRepository adConversionRepository;
    @Override
    public List<Conversion> getAllConversion() {
        return adConversionRepository.findAll();
    }

    @Override
    public Conversion addConversion(AdminCreateConversionRequest request) {

        Conversion conversion = new Conversion();
        conversion.setCode(request.getCode());
        conversion.setRatio(request.getRatio());
        conversion.setGift_id(request.getGiftId());
        return adConversionRepository.save(conversion);
    }
}
