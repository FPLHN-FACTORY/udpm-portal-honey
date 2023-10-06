package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminChestGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminRandomPointRequest;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminChestReponse;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.common.response.SimpleResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdRandomAddPointService {
    List<AdminCategoryResponse> getAllCategory();

    List<SimpleResponse> getListStudent(String emailSearch);

    Boolean createRandomPoint(AdminRandomPointRequest adminRandomPointRequest);

    Boolean createRandomItem(AdminRandomPointRequest adminRandomPointRequest);

    Boolean exportExcel();

    List<String> importExcel(MultipartFile file);

    List<AdminChestReponse> getAllChest();

    List<AdminChestGiftResponse> getAllGiftByChest(String idChest);

    AdminChestReponse getChestById(String idChest);

    Boolean deleteChestGidt(String idChest, String idGift);
}
