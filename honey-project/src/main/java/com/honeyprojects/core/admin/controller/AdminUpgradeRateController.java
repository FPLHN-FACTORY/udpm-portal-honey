package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.dto.CensorUpgradeRateDTO;
import com.honeyprojects.core.admin.model.dto.CensorUpgradeRateGiftDTO;
import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.model.request.CensorAddUpgradeRateRequest;
import com.honeyprojects.core.admin.model.response.AdminUpgradeRateResponse;
import com.honeyprojects.core.admin.repository.AdHoneyRepository;
import com.honeyprojects.core.admin.service.AdUpgradeRateGiftService;
import com.honeyprojects.core.admin.service.AdUpgradeRateService;
import com.honeyprojects.core.admin.service.AdminCategoryService;
import com.honeyprojects.core.admin.service.AdminGiftService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.entity.*;
import com.honeyprojects.service.GiftService;
import com.honeyprojects.service.UpgradeRateService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/censor/upgrade-rate")
public class AdminUpgradeRateController {
    @Autowired
    AdUpgradeRateService adUpgradeRateService;

    @Autowired
    AdUpgradeRateGiftService adUpgradeRateGiftService;

    @Autowired
    AdminGiftService adminGiftService;

    @Autowired
    GiftService giftService;

    @Autowired
    UpgradeRateService upgradeRateService;

    @Autowired
    AdminCategoryService adminCategoryService;

    @GetMapping("")
    public ResponseObject getCensorUpgradeRate(AdminUpgradeRateRequest searchParams){
        PageableObject<UpgradeRate> upgradeRateList =  upgradeRateService.getLstUpgradeRatesExist(searchParams);
        List<CensorUpgradeRateDTO> lstCensorUpgradeRateDTOS = new ArrayList<>();
        int stt = 1;
        if(!upgradeRateList.getData().isEmpty()){
            for (UpgradeRate upgradeRate:
            upgradeRateList.getData()) {
                //response: id gift la cua id upgrade rate gift
                List<Gift> giftList = giftService.getUpgradeRateGiftsExistBYIdUpgradeRate(upgradeRate.getId(), searchParams);
                List<CensorUpgradeRateGiftDTO> lstCensorUpgradeRateGiftDTOS = new ArrayList<>();
                for (Gift gift:
                giftList) {
                    CensorUpgradeRateGiftDTO censorUpgradeRateGiftDTO = new CensorUpgradeRateGiftDTO();
                    censorUpgradeRateGiftDTO.setId(gift.getId());
                    censorUpgradeRateGiftDTO.setName(gift.getName());
                    lstCensorUpgradeRateGiftDTOS.add(censorUpgradeRateGiftDTO);
                }
                CensorUpgradeRateDTO censorUpgradeRateDTO = new CensorUpgradeRateDTO();
                BeanUtils.copyProperties(upgradeRate, censorUpgradeRateDTO);
                censorUpgradeRateDTO.setOriginalHoneyName(adminCategoryService.getOne(upgradeRate.getOriginalHoney()).getName());
                censorUpgradeRateDTO.setDestinationHoneyName(adminCategoryService.getOne(upgradeRate.getDestinationHoney()).getName());
                censorUpgradeRateDTO.setRatio(""+upgradeRate.getRatio());
                censorUpgradeRateDTO.setStatus(upgradeRate.getStatus().ordinal());
                censorUpgradeRateDTO.setListUpgrateRateGiftDTO(lstCensorUpgradeRateGiftDTOS);
                censorUpgradeRateDTO.setStt(""+stt);
                stt++;
                lstCensorUpgradeRateDTOS.add(censorUpgradeRateDTO);
            }
            return new ResponseObject(lstCensorUpgradeRateDTOS);
        }else return new ResponseObject(lstCensorUpgradeRateDTOS);
    }
    @PostMapping("add")
    public void add(@RequestBody CensorAddUpgradeRateRequest searchParams){
        UpgradeRate upgradeRate = adUpgradeRateService.save(searchParams);
        adUpgradeRateGiftService.saveAllByGiftIdsAndUpgradeRateId(searchParams.getIdGifts(), upgradeRate.getId());
    }

    @PutMapping("update/{id}")
    public ResponseObject update(@RequestBody CensorAddUpgradeRateRequest searchParams, @PathVariable("id") String id){
        return new ResponseObject(adUpgradeRateService.update(searchParams, id));
    }

    @PutMapping("delete/{id}")
    public void delete(@PathVariable("id") String id){
          adUpgradeRateService.delete(id);
    }

    @GetMapping("get-all-gift-exist")
    public ResponseObject getAllCensorExist(){
        return new ResponseObject(adminGiftService.getAllGiftExist());
    }
}
