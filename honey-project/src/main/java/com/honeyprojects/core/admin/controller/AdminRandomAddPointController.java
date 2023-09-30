package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminRandomPointRequest;
import com.honeyprojects.core.admin.service.AdRandomAddPointService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/get/gift-by-type")
    public ResponseObject getGiftByType(@RequestParam("typeNumber") Integer typeNumber) {
        return new ResponseObject(adRandomAddPointService.getGiftByType(typeNumber));
    }

    @PostMapping("create/export")
    public ResponseObject createExportRandomPoint() {
        return new ResponseObject(adRandomAddPointService.exportExcel());
    }

    @PostMapping("create/import")
    public ResponseObject createImportRandomPoint(@RequestParam("file") MultipartFile file) {
        return new ResponseObject(adRandomAddPointService.importExcel(file));
    }

    @GetMapping("/get-all-type-gift")
    public ResponseObject getAllTypeGift() {
        return new ResponseObject(adRandomAddPointService.getAllTypeGift());
    }
}
