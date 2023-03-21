package com.portalprojects.core.admin.service;

import com.portalprojects.core.admin.model.request.AdCreateGiftRequest;
import com.portalprojects.entity.Gift;

import java.util.ArrayList;

public interface GiftService {

    ArrayList<Gift> getAll();

    Gift createGift(AdCreateGiftRequest createGiftRequest);

    Gift updateGift(AdCreateGiftRequest createGiftRequest);

    Gift deleteGift(String id);

}
