package com.portalprojects.core.admin.service;

import com.portalprojects.core.admin.model.request.AdGiftRequest;
import com.portalprojects.entity.Gift;

import java.util.List;

public interface GiftService {

    List<Gift> getAll();

    Gift createGift(AdGiftRequest createGiftRequest);

    Gift updateGift(AdGiftRequest createGiftRequest);

    Gift deleteGift(String id);

    List<Gift> getMyGift(String studentCode);

}
