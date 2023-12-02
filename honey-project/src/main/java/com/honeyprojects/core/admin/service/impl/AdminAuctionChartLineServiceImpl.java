package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminAuctionChartLineRequest;
import com.honeyprojects.core.admin.model.request.AdminAuctionChartTableRequest;
import com.honeyprojects.core.admin.model.response.AdminAuctionChartLineResponse;
import com.honeyprojects.core.admin.repository.AdAuctionChartLineRepository;
import com.honeyprojects.core.admin.service.AdminAuctionChartLineService;
import com.honeyprojects.core.common.base.PageableObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminAuctionChartLineServiceImpl implements AdminAuctionChartLineService {

    @Autowired
    private AdAuctionChartLineRepository adAuctionChartLineRepository;

    @Override
    public List<AdminAuctionChartLineResponse> getAuctionChartLine(AdminAuctionChartLineRequest adminAuctionChartLineRequest) {
        return adAuctionChartLineRepository.auctionChartLine(adminAuctionChartLineRequest);
    }

    @Override
    public PageableObject getAuctionChartTable(AdminAuctionChartTableRequest adminAuctionChartTableRequest) {
        Pageable pageable = PageRequest.of(adminAuctionChartTableRequest.getPage(), adminAuctionChartTableRequest.getSize());
        return new PageableObject(adAuctionChartLineRepository.getAuctionTable(adminAuctionChartTableRequest, pageable));
    }
}
