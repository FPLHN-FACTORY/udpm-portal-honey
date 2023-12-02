package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminAuctionChartLineRequest;
import com.honeyprojects.core.admin.model.request.AdminAuctionChartTableRequest;
import com.honeyprojects.core.admin.model.response.AdminAuctionChartLineResponse;
import com.honeyprojects.core.common.base.PageableObject;

import java.util.List;

public interface AdminAuctionChartLineService {
    List<AdminAuctionChartLineResponse> getAuctionChartLine(AdminAuctionChartLineRequest adminAuctionChartLineRequest);
    PageableObject getAuctionChartTable(AdminAuctionChartTableRequest adminAuctionChartTableRequest);
}
