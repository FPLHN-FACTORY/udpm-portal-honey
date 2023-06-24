package com.portalprojects.core.admin.service.impl;

import com.portalprojects.core.admin.model.request.AdGiftDetailRequest;
import com.portalprojects.core.admin.model.response.GiftDetailResponse;
import com.portalprojects.core.admin.repository.AdGiftDetailRepository;
import com.portalprojects.core.admin.service.GiftDetailService;
import com.portalprojects.entity.GiftDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GiftDetailServiceImpl implements GiftDetailService {

    @Autowired
    private AdGiftDetailRepository adGiftDetailRepository;

    @Override
    public List<GiftDetail> createGiftDetail(List<GiftDetail> lists) {
//        GiftDetail giftDetail = new GiftDetail();
//        giftDetail.setStudentId(adGiftDetailRequest.getStudentId());
//        giftDetail.setGiftId(adGiftDetailRequest.getGiftId());
//        giftDetail.setChangeDate(new Date());
        return adGiftDetailRepository.saveAll(lists);
    }

    @Override
    public List<GiftDetailResponse> getGiftDetail(String id) {
        return adGiftDetailRepository.getGiftDetailById(id);
    }
}
