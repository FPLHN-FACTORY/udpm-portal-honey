package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.service.AdUpgradeRateGiftService;
import com.honeyprojects.core.admin.service.AdminGiftService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/censor/upgrade-rate")
public class AdminUpgradeRateController {

    @Autowired
    private AdUpgradeRateGiftService adUpgradeRateGiftService;

    @Autowired
    private AdminGiftService adminGiftService;

    @GetMapping("")
    public ResponseObject getCensorUpgradeRate(AdminUpgradeRateRequest searchParams){
        return new ResponseObject(adUpgradeRateGiftService.getAllUpgradeRateGift(searchParams));
    }
    @PostMapping("/add-update")
    public ResponseObject addOrUpdate(@RequestBody AdminUpgradeRateGiftRequest addUpgradeRateRequest){
        return new ResponseObject(adUpgradeRateGiftService.addOrUpdateUpgradeRateGift(addUpgradeRateRequest));
    }

    @GetMapping("/delete")
    public ResponseObject deleteUpgrade(@RequestParam("id") String id, @RequestParam(name = "status") Long status) {
        return new ResponseObject(adUpgradeRateGiftService.updateStatusUpgradeRateGift(id, status));
    }

    @GetMapping("get-all-gift-exist")
    public ResponseObject getAllCensorExist(){
        return new ResponseObject(adminGiftService.getAllGiftExist());
    }
}
