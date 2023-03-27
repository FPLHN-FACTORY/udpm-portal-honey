package com.portalprojects.core.admin.service.impl;

import com.portalprojects.core.admin.model.request.AdCreateGiftRequest;
import com.portalprojects.core.admin.repository.AdGiftRepository;
import com.portalprojects.core.admin.service.GiftService;
import com.portalprojects.entity.Gift;
import com.portalprojects.repository.GiftRepository;
import com.portalprojects.util.AutomaticCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service

public class GiftServiceImpl implements GiftService {

    @Autowired
    private AdGiftRepository giftRepository;

    @Autowired
    private AutomaticCode automaticCode;

    @Autowired
    @Qualifier(GiftRepository.NAME)
    private GiftRepository repository;

    @Override
    public ArrayList<Gift> getAll() {
        return giftRepository.getAll();
    }

    @Override
    public Gift createGift(AdCreateGiftRequest createGiftRequest) {
        Gift gift = new Gift();
        String text = "QT";
        String nearestCode = repository.getNearestCodeGift();
        String code = automaticCode.autumaticCode(text, nearestCode);
        gift.setCode(code);
        gift.setName(createGiftRequest.getName());
        gift.setPointGift(createGiftRequest.getPointGift());
        return giftRepository.save(gift);
    }

    @Override
    public Gift updateGift(AdCreateGiftRequest createGiftRequest) {
        Optional<Gift> gift = giftRepository.findById(createGiftRequest.getId());
        gift.get().setName(createGiftRequest.getName());
        gift.get().setPointGift(createGiftRequest.getPointGift());
        return giftRepository.save(gift.get());
    }

    @Override
    public Gift deleteGift(String id) {
        Optional<Gift> gift = giftRepository.findById(id);
        giftRepository.delete(gift.get());
        return gift.get();
    }
}
