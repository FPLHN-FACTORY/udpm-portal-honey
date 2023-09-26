package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.admin.repository.AdGiftRepository;
import com.honeyprojects.core.admin.service.AdminGiftService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.infrastructure.contant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AdminGiftServiceImpl implements AdminGiftService {

    @Autowired
    private AdGiftRepository adGiftRepository;


    @Override
    public PageableObject<AdminGiftResponse> getAllCategoryByAdmin(AdminGiftRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<AdminGiftResponse> pageRes = adGiftRepository.getAllGiftByAdmin(pageable, request);
        return new PageableObject<>(pageRes);
    }

    @Override
    public List<AdminGiftResponse> getAllListGift() {
        return adGiftRepository.getAllListResponse();
    }

    @Override
    @Transactional
    public Gift addGift(AdminCreateGiftRequest request) {
        Gift gift = request.dtoToEntity(new Gift());
        return adGiftRepository.save(gift);
    }

    @Override
    @Transactional
    public Gift updateGift(AdminUpdateGiftRequest request, String id) {
        Optional<Gift> optional = adGiftRepository.findById(id);
        optional.get().setStatus(Status.HOAT_DONG);
        optional.get().setName(request.getName());
        return adGiftRepository.save(optional.get());
    }

    @Override
    public Gift getOne(String id) {
        return adGiftRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public void deleteById(String id) {
        adGiftRepository.deleteById(id);
    }

    public Gift updateStatusGift(AdminUpdateGiftRequest request, String id) {
        Optional<Gift> optional = adGiftRepository.findById(id);
        optional.get().setStatus(Status.KHONG_HOAT_DONG);
        optional.get().setName(request.getName());
        return adGiftRepository.save(optional.get());
    }
}
