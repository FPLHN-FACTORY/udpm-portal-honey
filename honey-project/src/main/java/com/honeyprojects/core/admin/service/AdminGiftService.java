package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminCreateGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Gift;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AdminGiftService {

    PageableObject<AdminGiftResponse> getAllCategoryByAdmin(AdminGiftRequest request);

    List<AdminGiftResponse> getAllListGift();

    Gift addGift(AdminCreateGiftRequest request) throws IOException;

    Gift updateGift(AdminUpdateGiftRequest request,String id);

    Gift getOne(String id);

    void deleteById(String id);

    Gift updateStatusGift(AdminUpdateGiftRequest request,String id);

}
