package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.*;
import com.honeyprojects.core.admin.model.response.AdminClubResponse;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Club;
import com.honeyprojects.entity.Gift;

import java.util.List;

public interface AdminClubService {
    PageableObject<AdminClubResponse> getAllCategoryByAdmin(AdminClubRequest request);

    List<AdminClubResponse> getAllListGift();

    Club addClub(AdminCreateClubRequest request);

    Club updateClub(AdminUpdateClubRequest request, String id);

    Club getOne(String id);

    void deleteById(String id);

    Club updateStatusClub(AdminUpdateClubRequest request,String id);
}
