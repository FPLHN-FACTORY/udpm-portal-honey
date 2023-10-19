package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminClubRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateClubGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateClubRequest;
import com.honeyprojects.core.admin.model.request.AdminGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateClubRequest;
import com.honeyprojects.core.admin.model.response.AdminClubGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminClubResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Club;

import java.util.List;

public interface AdminClubService {
    PageableObject<AdminClubResponse> getAllCategoryByAdmin(AdminClubRequest request);

    PageableObject<AdminClubGiftResponse> findGiftInClub(AdminGiftRequest request);

    PageableObject<AdminClubGiftResponse> findGiftNotInClub(AdminGiftRequest request);

    Boolean addGiftClub(AdminCreateClubGiftRequest request);

    List<AdminClubResponse> getAllListGift();

    Club addClub(AdminCreateClubRequest request);

    Club updateClub(AdminUpdateClubRequest request, String id);

    Club getOne(String id);

    void deleteById(String id);

    Club updateStatusClub(AdminUpdateClubRequest request,String id);
}
