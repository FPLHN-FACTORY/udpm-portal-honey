package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.model.response.AdminUpgradeRateResponse;
import com.honeyprojects.core.admin.service.AdUpgradeRateService;
import com.honeyprojects.core.common.base.PageableObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("censor/upgrade-rate")
public class AdminUpgradeRateController {
    @Autowired
    AdUpgradeRateService adUpgradeRateService;
    @GetMapping("")
    public PageableObject<AdminUpgradeRateResponse> getUpgradeRate(AdminUpgradeRateRequest searchParams){
        return adUpgradeRateService.getUpgradeRate(searchParams);
    }

}
