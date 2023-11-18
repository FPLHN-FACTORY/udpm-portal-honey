package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminChestRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateChestRequest;
import com.honeyprojects.core.admin.model.response.AdminChestReponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Chest;

public interface AdminChestService {

    PageableObject<AdminChestReponse> getAllChestByAdmin(AdminChestRequest request);

    Chest addChest(AdminCreateChestRequest request);

    void deleteChest(String id);

    Chest updateChest(AdminCreateChestRequest request, String id);

}
