package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminCreateChestRequest;
import com.honeyprojects.core.admin.model.request.AdminRandomPointRequest;
import com.honeyprojects.core.admin.model.response.*;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.entity.Chest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AdRandomAddPointService {
    List<AdminCategoryResponse> getAllCategory();

    List<SimpleResponse> getListStudent(String emailSearch);

    Boolean createRandomPoint(AdminRandomPointRequest adminRandomPointRequest);

    Boolean createRandomItem(AdminRandomPointRequest adminRandomPointRequest);

    Boolean exportExcel();

    // màn cộng mật ong
    Boolean previewDataExportExcel();

    // màn cộng mật ong
    AdminAddPointBO importExcel(MultipartFile file) throws IOException;

    // màn cộng mật ong
    AdminAddItemBO previewDataImportExcel(MultipartFile file) throws IOException;

    void importData(List<AdminAddItemDTO> lstAddItemDTO) throws IOException;

    List<AdminChestReponse> getAllChest();

    List<AdminChestGiftResponse> getAllGiftByChest(String idChest);

    AdminChestReponse getChestById(String idChest);

    Boolean deleteChestGift(String idChest, String idGift);

    List<String> getAllNameChest();

    Chest addChest(String name);
}
