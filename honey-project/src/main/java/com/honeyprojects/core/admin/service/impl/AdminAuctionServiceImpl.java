package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateAuctionRequest;
import com.honeyprojects.core.admin.model.request.AdminFindAuctionRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateAuctionRequest;
import com.honeyprojects.core.admin.model.response.AdminAuctionResponse;
import com.honeyprojects.core.admin.repository.AdAuctionRepository;
import com.honeyprojects.core.admin.service.AdminAuctionService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Auction;
import com.honeyprojects.infrastructure.contant.Message;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminAuctionServiceImpl implements AdminAuctionService {

    @Autowired
    private AdAuctionRepository adAuctionRepository;

    private List<AdminAuctionResponse> auctionList;

    @Override
    public List<Auction> getAllAuction() {
        return adAuctionRepository.getAllAuction();
    }

    @Override
    public PageableObject<AdminAuctionResponse> findAllAuction(AdminFindAuctionRequest req) {
        Pageable pageable = PageRequest.of(req.getPage() - 1, req.getSize());
        Page<AdminAuctionResponse> auctionResponses = adAuctionRepository.findAllAuction(req, pageable);
        auctionList = auctionResponses.stream().toList();
        System.out.println(auctionList);
        return new PageableObject<>(auctionResponses);
    }

    @Override
    public Auction addAuction(AdminCreateAuctionRequest request) {
        Auction auction = new Auction();
        auction.setName(request.getName());
        auction.setHoney(request.getHoney());
        auction.setHoneyCategoryId(request.getHoneyCategoryId());
        if (request.getStatus() == 0) {
            auction.setStatus(Status.HOAT_DONG);
        }
        if (request.getStatus() == 1) {
            auction.setStatus(Status.KHONG_HOAT_DONG);
        }
        return adAuctionRepository.save(auction);
    }

    @Override
    public Auction updateAuction(AdminUpdateAuctionRequest request) {
        Optional<Auction> findAuctionById = adAuctionRepository.findById(request.getId());
        if (!findAuctionById.isPresent()) {
            throw new RestApiException(Message.AUCTION_NOT_EXISTS);
        }
        Auction auction = findAuctionById.get();
        auction.setName(request.getName());
        auction.setHoney(request.getHoney());
        auction.setHoneyCategoryId(request.getHoneyCategoryId());

        if (request.getStatus() == 0) {
            auction.setStatus(Status.HOAT_DONG);
        }
        if (request.getStatus() == 1) {
            auction.setStatus(Status.KHONG_HOAT_DONG);
        }
        return adAuctionRepository.save(auction);
    }

    @Override
    public String changeAuctionStatus(String id) {
        Optional<Auction> findAuctionById = adAuctionRepository.findById(id);
        if (!findAuctionById.isPresent()) {
            throw new RestApiException(Message.AUCTION_NOT_EXISTS);
        }
        Auction auction = findAuctionById.get();
        auction.setStatus(Status.KHONG_HOAT_DONG);
        adAuctionRepository.save(auction);
         return id;
    }

    @Override
    public boolean deleteAuction(String id) {
        Optional<Auction> findAuctionById = adAuctionRepository.findById(id);
        if (!findAuctionById.isPresent()) {
            throw new RestApiException(Message.AUCTION_NOT_EXISTS);
        }
        adAuctionRepository.delete(findAuctionById.get());
        return true;
    }

    @Override
    public List<AdminAuctionResponse> findAll(AdminFindAuctionRequest req) {
        return adAuctionRepository.findAll(req);
    }


}
