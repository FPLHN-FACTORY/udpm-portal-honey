package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminRandomPointRequest;
import com.honeyprojects.core.admin.model.response.AdminAddItemBO;
import com.honeyprojects.core.admin.model.response.AdminAddItemDTO;
import com.honeyprojects.core.admin.model.response.AdminAddPointBO;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminChestReponse;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.entity.Chest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public interface AdRandomAddPointService {

    List<AdminCategoryResponse> getAllCategory();

    List<SimpleResponse> getListStudent(String emailSearch);

    Boolean createRandomPoint(AdminRandomPointRequest adminRandomPointRequest);

    Boolean createRandomChest(AdminRandomPointRequest adminRandomPointRequest);

    ByteArrayOutputStream exportExcel(HttpServletResponse response);

    // màn cộng mật ong
//    Boolean previewDataExportExcel();

    ByteArrayOutputStream previewDataExportExcel(HttpServletResponse response);

    AdminAddPointBO previewDataRandomExcel(MultipartFile file) throws IOException;

    // màn cộng mật ong
    AdminAddItemBO previewDataImportExcel(MultipartFile file) throws IOException;

    // màn cộng mật ong
    void importData(List<AdminAddItemDTO> lstAddItemDTO) throws IOException;

    List<AdminChestReponse> getAllChest();

    List<AdminChestGiftResponse> getAllGiftByChest(String idChest);

    AdminChestReponse getChestById(String idChest);

    Boolean deleteChestGift(String idChest, String idGift);

    List<String> getAllNameChest();

    Chest addChest(String name);
}
