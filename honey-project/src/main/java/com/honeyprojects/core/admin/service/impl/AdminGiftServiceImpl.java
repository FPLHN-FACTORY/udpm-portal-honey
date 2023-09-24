package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.admin.repository.AdGiftRepository;
import com.honeyprojects.core.admin.service.AdminGiftService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.infrastructure.contant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class AdminGiftServiceImpl implements AdminGiftService {

  @Autowired
  private AdGiftRepository adGiftRepository;


    @Override
    public PageableObject<AdminGiftResponse> getAllCategoryByAdmin(AdminGiftRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<AdminGiftResponse> pageRes = adGiftRepository.getAllGiftByAdmin(pageable,request);
        return null;
    }

    @Override
    public List<AdminGiftResponse> getAllListGift() {
        return adGiftRepository.getAllListResponse();
    }

    @Override
    public Gift addGift(AdminCreateGiftRequest request) {
//        Random random = new Random();
//        int number = random.nextInt(1000);
//        String code = String.format("G%04d",number);
        Gift g = new Gift();
        g.setCode(request.getCode());
        g.setName(request.getName());
        g.setStatus(Status.HOAT_DONG);
        adGiftRepository.save(g);

        return g;
    }

    @Override
    public Gift updateGift(AdminUpdateGiftRequest request, String id) {
        Gift getOne = adGiftRepository.findById(id).orElse(null);

//        getOne.setStatus(Status.KHONG_HOAT_DONG);


        return adGiftRepository.save(getOne);
    }

    @Override
    public Gift getOne(String id) {
        return adGiftRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(String id) {
        adGiftRepository.deleteById(id);
    }
}
