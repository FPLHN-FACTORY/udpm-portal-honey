package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.service.AdUpgradeRateService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/censor/upgrade-rate")
public class AdminUpgradeRateController {
    @Autowired
    AdUpgradeRateService adUpgradeRateService;
    @GetMapping("")
    public ResponseObject getUpgradeRate(AdminUpgradeRateRequest searchParams){
        System.out.println("----------------"+adUpgradeRateService.getUpgradeRate(searchParams).getData().size());
        return new ResponseObject(adUpgradeRateService.getUpgradeRate(searchParams));
    }
    @GetMapping("/search")
    public ResponseObject search(AdminUpgradeRateRequest searchParams){
        return new ResponseObject(adUpgradeRateService.getUpgradeRate(searchParams));
    }
    @PostMapping("add")
    public ResponseObject add(@RequestBody AdminUpgradeRateRequest searchParams){
        return new ResponseObject(adUpgradeRateService.save(searchParams));
    }

    @PutMapping("update/{id}")
    public ResponseObject update(@RequestBody AdminUpgradeRateRequest searchParams, @PathVariable("id") String id){
        return new ResponseObject(adUpgradeRateService.update(searchParams, id));
    }

    @PutMapping("delete/{id}")
    public void delete(@PathVariable("id") String id){
          adUpgradeRateService.delete(id);
    }
}
