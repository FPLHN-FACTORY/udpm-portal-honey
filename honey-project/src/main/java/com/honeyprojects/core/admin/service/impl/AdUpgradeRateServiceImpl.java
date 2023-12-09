package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.model.request.CensorAddUpgradeRateRequest;
import com.honeyprojects.core.admin.model.response.AdminUpgradeRateResponse;
import com.honeyprojects.core.admin.repository.AdUpgradeRateGiftRepository;
import com.honeyprojects.core.admin.repository.AdUpgradeRateRepository;
import com.honeyprojects.core.admin.repository.AdminCategoryRepository;
import com.honeyprojects.core.admin.service.AdUpgradeRateService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.UpgradeRate;
import com.honeyprojects.infrastructure.contant.Status;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AdUpgradeRateServiceImpl implements AdUpgradeRateService {
    AdUpgradeRateRepository adUpgradeRateRepository;

    AdUpgradeRateGiftRepository adUpgradeRateGiftRepository;

    AdminCategoryRepository adminCategoryRepository;

    @Override
    public PageableObject<AdminUpgradeRateResponse> getUpgradeRate(AdminUpgradeRateRequest searchParams) {
        Pageable pageable = PageRequest.of(searchParams.getPage(), searchParams.getSize());
        Page<AdminUpgradeRateResponse> rsPage = adUpgradeRateRepository.getUpgradeRate(searchParams, pageable);
        return new PageableObject<>(rsPage);
    }
    @Override
    public UpgradeRate save(CensorAddUpgradeRateRequest params) {
        UpgradeRate entity = new UpgradeRate();
        boolean check = true;
        long entityCount = adUpgradeRateRepository.count();
        entity.setCode("UR" + (entityCount + 1));
        entity.setStatus(Status.HOAT_DONG);
        entity.setQuantityDestinationHoney(params.getQuantityDestinationHoney());
        entity.setQuantityOriginalHoney(params.getQuantityOriginalHoney());
        entity.setRatio(Double.valueOf(params.getRatio()));
        Optional<Category> optionalCategory1 = adminCategoryRepository.findById(params.getOriginalHoneyId());
        if (optionalCategory1.isPresent()){
            entity.setOriginalHoney(params.getOriginalHoneyId());
        }else{
            check = false;
        }
        Optional<Category> optionalCategory2 = adminCategoryRepository.findById(params.getDestinationHoneyId());
        if (optionalCategory2.isPresent()){
            entity.setDestinationHoney(params.getDestinationHoneyId());
        }else{
            check = false;
        }
        if(check == true){
            return adUpgradeRateRepository.save(entity);
        }else return null;
    }
    @Override
    public UpgradeRate update(CensorAddUpgradeRateRequest params, String id) {
        Optional<UpgradeRate> entity = adUpgradeRateRepository.findById(id);
        if(entity.isPresent()){
            boolean check = true;
            if("0".equalsIgnoreCase(params.getStatus())){
                entity.get().setStatus(Status.HOAT_DONG);
            }else{
                entity.get().setStatus(Status.KHONG_HOAT_DONG);
            }

            entity.get().setRatio(Double.valueOf(params.getRatio()));
            Optional<Category> optionalCategory1 = adminCategoryRepository.findById(params.getOriginalHoneyId());
            if (optionalCategory1.isPresent()){
                entity.get().setOriginalHoney(params.getOriginalHoneyId());
            }else{
                check = false;
            }
            Optional<Category> optionalCategory2 = adminCategoryRepository.findById(params.getDestinationHoneyId());
            if (optionalCategory2.isPresent()){
                entity.get().setDestinationHoney(params.getDestinationHoneyId());
            }else{
                check = false;
            }
            if(check == true){
                return adUpgradeRateRepository.save(entity.get());
            }
        }
        return null;
    }

    @Override
    public Optional<UpgradeRate> findById(String s) {
        return adUpgradeRateRepository.findById(s);
    }
    @Override
    public void delete(String id) {
        Optional<UpgradeRate> opt = adUpgradeRateRepository.findById(id);
        if(opt.isPresent()){
            opt.get().setStatus(Status.KHONG_HOAT_DONG);
            adUpgradeRateRepository.save(opt.get());
        }
    }
}
