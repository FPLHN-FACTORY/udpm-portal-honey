package com.portalprojects.core.admin.service.impl;

import com.portalprojects.core.admin.model.request.AdCreateGiftRequest;
import com.portalprojects.core.admin.repository.AdGiftRepository;
import com.portalprojects.core.admin.service.GiftService;
import com.portalprojects.entity.Gift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service

public class GiftServiceImpl implements GiftService {

    @Autowired
    private AdGiftRepository giftRepository;

    @Override
    public ArrayList<Gift> getAll() {
        return giftRepository.getAll();
    }

    @Override
    public Gift createGift(AdCreateGiftRequest createGiftRequest) {
        Gift gift = new Gift();
        gift.setCode(createGiftRequest.getCode());
        gift.setName(createGiftRequest.getName());
        gift.setPointGift(createGiftRequest.getPointGift());
        gift.setNote(createGiftRequest.getNote());
        return giftRepository.save(gift);
    }

    @Override
    public Gift updateGift(AdCreateGiftRequest createGiftRequest) {
        Optional<Gift> gift = giftRepository.findById(createGiftRequest.getId());
        gift.get().setName(createGiftRequest.getName());
        gift.get().setPointGift(createGiftRequest.getPointGift());
        gift.get().setNote(createGiftRequest.getNote());
        return giftRepository.save(gift.get());
    }

    @Override
    public Gift deleteGift(String id) {
        Optional<Gift> gift = giftRepository.findById(id);
        giftRepository.delete(gift.get());
        return gift.get();
    }
}
