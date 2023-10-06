package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminCreateChestGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminGetGiftResponse;
import com.honeyprojects.entity.ChestGift;
import com.honeyprojects.entity.Gift;

import java.util.List;

public interface AdminChestGiftService {

    void deleteChestGift(String id);

    List<AdminChestGiftResponse> getChestGift(String chestId);

    List<ChestGift> addGiftsToChest(AdminCreateChestGiftRequest request);

    List<AdminGetGiftResponse> findGiftNotJoinChest(String idChest);

    List<Gift> deleteGiftInChest(AdminCreateChestGiftRequest request);

    List<ChestGift> createChestGift(AdminCreateChestGiftRequest request);

}
