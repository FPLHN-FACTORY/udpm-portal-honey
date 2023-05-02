package com.portalprojects.core.admin.service;

import com.portalprojects.core.admin.model.request.AdGiftDetailRequest;
import com.portalprojects.entity.GiftDetail;

import java.util.List;

public interface GiftDetailService {

    List<GiftDetail> createGiftDetail(List<GiftDetail>lists);
}
