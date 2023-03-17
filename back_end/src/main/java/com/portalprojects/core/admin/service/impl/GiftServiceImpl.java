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
    public Boolean createGift(AdCreateGiftRequest createGiftRequest) {
        try {
            Gift gift = new Gift();
            gift.setCode(createGiftRequest.getCode());
            gift.setName(createGiftRequest.getName());
            gift.setPointGift(createGiftRequest.getPointGift());
            gift.setNote(createGiftRequest.getNote());
            gift.setCreatedDate(4252342l);
            gift.setLastModifiedDate(4252342l);
            giftRepository.save(gift);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean updateGift(AdCreateGiftRequest createGiftRequest) {
        try {
            Optional<Gift> gift = giftRepository.findById(createGiftRequest.getId());
            gift.get().setName(createGiftRequest.getName());
            gift.get().setPointGift(createGiftRequest.getPointGift());
            gift.get().setNote(createGiftRequest.getNote());
            giftRepository.save(gift.get());
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean deleteGift(String id) {
        Optional<Gift> gift = giftRepository.findById(id);
        giftRepository.delete(gift.get());
        return true;
    }
}
