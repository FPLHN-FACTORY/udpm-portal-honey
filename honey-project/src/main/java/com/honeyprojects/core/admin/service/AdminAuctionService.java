package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminCreateAuctionRequest;
import com.honeyprojects.core.admin.model.request.AdminFindAuctionRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateAuctionRequest;
import com.honeyprojects.core.admin.model.response.AdminAuctionResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Auction;


import java.util.List;

public interface AdminAuctionService {

    List<Auction> getAllAuction();

    PageableObject<AdminAuctionResponse> findAllAuction(AdminFindAuctionRequest req);

    Auction addAuction(AdminCreateAuctionRequest request);

    Auction updateAuction(AdminUpdateAuctionRequest request);

    boolean changeAuctionStatus(String id);

    boolean deleteAuction(String id);
}
