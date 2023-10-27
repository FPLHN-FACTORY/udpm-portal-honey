package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminAddGiftDetailRequest;
import com.honeyprojects.core.admin.model.response.AdminGiftDetailResponse;
import com.honeyprojects.entity.GiftDetail;

import java.util.List;

public interface AdminGiftDetailService {
    GiftDetail add(AdminAddGiftDetailRequest request);

    List<AdminGiftDetailResponse> listGiftDetailByGiftId(String idGift);
}
