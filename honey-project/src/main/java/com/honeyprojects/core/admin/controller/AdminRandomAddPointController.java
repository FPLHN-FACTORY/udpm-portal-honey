package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminRandomPointRequest;
import com.honeyprojects.core.admin.model.response.AdminAddItemDTO;
import com.honeyprojects.core.admin.service.AdRandomAddPointService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/censor/random-add-point")
public class AdminRandomAddPointController {
    @Autowired
    private AdRandomAddPointService adRandomAddPointService;

    @GetMapping("/get-all-category")
    public ResponseObject getAllCatrgory() {
        return new ResponseObject(adRandomAddPointService.getAllCategory());
    }

    @GetMapping("/get-list-student")
    public ResponseObject getListStudent(final String emailSearch) {
        return new ResponseObject(adRandomAddPointService.getListStudent(emailSearch));
    }

    @PostMapping("/create/random/point")
    public ResponseObject createRandomPoint(@RequestBody AdminRandomPointRequest adminRandomPointRequest) {
        return new ResponseObject(adRandomAddPointService.createRandomPoint(adminRandomPointRequest));
    }

    @PostMapping("/create/random/item")
    public ResponseObject createRandomItem(@RequestBody AdminRandomPointRequest adminRandomPointRequest) {
        return new ResponseObject(adRandomAddPointService.createRandomItem(adminRandomPointRequest));
    }

    @PostMapping("/create/export")
    public ResponseObject createExportRandomPoint() {
        return new ResponseObject(adRandomAddPointService.exportExcel());
    }

    @PostMapping("/create/import")
    public ResponseObject createImportRandomPoint(@RequestParam("file") MultipartFile file) {
        return new ResponseObject(adRandomAddPointService.importExcel(file));
    }

    @PostMapping("/create/preview-data")
    public ResponseObject createPreviewImportPoint(@RequestParam("file") MultipartFile file) throws IOException {
        return new ResponseObject(adRandomAddPointService.previewDataImportExcel(file));
    }

    @PostMapping("/export/preview-data")
    public ResponseObject previewDataExportExcel() {
        return new ResponseObject(adRandomAddPointService.previewDataExportExcel());
    }

    @PostMapping("/create/import-data")
    public void createImportPoint(@RequestBody List<AdminAddItemDTO> lstAdminAddItemDTO) throws IOException {
        adRandomAddPointService.importData(lstAdminAddItemDTO);
    }

    @GetMapping("/get-all-chest")
    public ResponseObject getAllChest() {
        return new ResponseObject(adRandomAddPointService.getAllChest());
    }

    @GetMapping("/get-all-gift-by-chest/{idChest}")
    public ResponseObject getAllGiftByChest(@PathVariable String idChest) {
        return new ResponseObject(adRandomAddPointService.getAllGiftByChest(idChest));
    }

    @GetMapping("/get-chest-by-id/{idChest}")
    public ResponseObject getChestById(@PathVariable String idChest) {
        return new ResponseObject(adRandomAddPointService.getChestById(idChest));
    }

    @DeleteMapping("/delete/chest-gift")
    public ResponseObject deleteChestGift(@RequestParam("idChest") String idChest, @RequestParam("idGift") String idGift) {
        return new ResponseObject(adRandomAddPointService.deleteChestGidt(idChest, idGift));
    }

    @GetMapping("/get-all-name-chest")
    public ResponseObject getAllNameChest() {
        return new ResponseObject(adRandomAddPointService.getAllNameChest());
    }

}
