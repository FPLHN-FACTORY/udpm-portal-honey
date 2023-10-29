package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminAddGiftDetailRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateGiftDetailRequest;
import com.honeyprojects.core.admin.model.response.AdminGiftDetailResponse;
import com.honeyprojects.core.admin.repository.AdGiftDetailRepository;
import com.honeyprojects.core.admin.service.AdminGiftDetailService;
import com.honeyprojects.entity.GiftDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminGiftDetailServiceImpl implements AdminGiftDetailService {

    @Autowired
    private AdGiftDetailRepository repository;
    @Override
    public GiftDetail add(AdminAddGiftDetailRequest request) {
        GiftDetail giftDetail = request.dtoToEntity(new GiftDetail());
        return repository.save(giftDetail);
    }

    @Override
    public GiftDetail update(AdminUpdateGiftDetailRequest request, String id) {
        Optional<GiftDetail> optional = repository.findById(id);
        GiftDetail giftDetail = optional.get();
        request.dtoToEntity(giftDetail);
        return repository.save(giftDetail);
    }

    @Override
    public void deleteById(String id) {
        repository.deleteById(id);
    }

    @Override
    public List<AdminGiftDetailResponse> listGiftDetailByGiftId(String idGift) {
        return repository.listGiftDetailByGiftId(idGift);
    }
}
