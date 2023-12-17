package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminAuctionChartLineRequest;
import com.honeyprojects.core.admin.model.request.AdminAuctionChartTableRequest;
import com.honeyprojects.core.admin.service.AdminAuctionChartLineService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/censor/auction/chart")
public class AdminAuctionChartController {

    @Autowired
    private AdminAuctionChartLineService adminAuctionChartLineService;

    @GetMapping("/line")
    public ResponseObject chartLine(AdminAuctionChartLineRequest adminAuctionChartLineRequest) {
        return new ResponseObject(adminAuctionChartLineService.getAuctionChartLine(adminAuctionChartLineRequest));
    }

    @GetMapping("/tables")
    public ResponseObject chartTable(AdminAuctionChartTableRequest adminAuctionChartTableRequest) {
        return new ResponseObject(adminAuctionChartLineService.getAuctionChartTable(adminAuctionChartTableRequest));
    }

    @GetMapping("/statistic")
    public ResponseObject statistic() {
        return new ResponseObject(adminAuctionChartLineService.getAuctionStatistic());
    }
}
