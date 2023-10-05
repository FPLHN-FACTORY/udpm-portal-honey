package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminCreateChestGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.entity.Gift;

import java.util.List;
import java.util.Optional;

public interface AdminChestGiftService {

//    ChestGift addChestGift(AdminCreateChestGiftRequest request);
//    List<ChestGift> saveAllChestGift(List<AdminCreateChestGiftRequest> chestGiftRequests);

    void deleteChestGift(String id);

    List<AdminChestGiftResponse> getChestGift(String chestId);

    void addGiftsToChest(AdminCreateChestGiftRequest request);

    List<AdminGiftResponse> findGiftNotJoinChest(String idChest);

    List<Gift> deleteGiftInChest(AdminCreateChestGiftRequest request);
}
