package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminCreateGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.admin.model.response.CensorGiftSelectResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Gift;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface AdminGiftService {

    PageableObject<AdminGiftResponse> getAllCategoryByAdmin(AdminGiftRequest request);

    List<AdminGiftResponse> getAllListGift();

    List<AdminGiftResponse> getAllListGiftUpgrade();

    Gift addGift(AdminCreateGiftRequest request) throws IOException;

    Gift updateGift(AdminUpdateGiftRequest request, String id) throws IOException;

    Gift getOne(String id);

    void deleteById(String id);

    Gift updateStatusGift(String id);

    Optional<Gift> findById(String s);

    List<CensorGiftSelectResponse> getAllGiftExist();
}
