package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateAuctionRequest;
import com.honeyprojects.core.admin.model.request.AdminFindAuctionRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateAuctionRequest;
import com.honeyprojects.core.admin.model.response.AdminAuctionResponse;
import com.honeyprojects.core.admin.repository.AdAuctionRepository;
import com.honeyprojects.core.admin.repository.AdGiftRepository;
import com.honeyprojects.core.admin.service.AdminAuctionService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Auction;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.infrastructure.contant.Message;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class AdminAuctionServiceImpl implements AdminAuctionService {

    @Autowired
    private AdAuctionRepository adAuctionRepository;

    @Autowired
    private AdGiftRepository adGiftRepository;


    @Override
    public List<Auction> getAllAuction() {
        return adAuctionRepository.getAllAuction();
    }

    @Override
    public PageableObject<AdminAuctionResponse> findAllAuction(AdminFindAuctionRequest req) {
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize());
        Page<AdminAuctionResponse> auctionResponses = adAuctionRepository.findAllAuction(req, pageable);
        return new PageableObject<>(auctionResponses);
    }

    @Override
    @Transactional
    public Auction addAuction(AdminCreateAuctionRequest request) {
        Optional<Gift> giftFind = adGiftRepository.findById(request.getGiftId());
        if (giftFind.isEmpty()) {
            throw new RestApiException("Không tìm thấy vật phẩm !");
        } else {
            if (giftFind.get().getQuantity() != null) {
                if (giftFind.get().getQuantity() < request.getQuantity()) {
                    throw new RestApiException("Số lượng \"" + giftFind.get().getName() + "\" đấu giá phải nhỏ hơn hoặc bằng "
                            + giftFind.get().getQuantity());
                } else {
                    Gift giftUpQuantity = giftFind.get();
                    giftUpQuantity.setQuantity(giftUpQuantity.getQuantity() - request.getQuantity());
                    adGiftRepository.save(giftUpQuantity);
                }
            }
            Auction auction = new Auction();
            auction.setName(request.getName());
            auction.setHoneyCategoryId(request.getHoneyCategoryId());
            auction.setGiftId(request.getGiftId());
            auction.setStartingPrice(BigDecimal.valueOf(request.getHoney()));
            auction.setFromDate(request.getFromDate());
            auction.setToDate(request.getToDate());
            auction.setQuantity(request.getQuantity());
            if (request.getStatus() == 0) {
                auction.setStatus(Status.HOAT_DONG);
            }
            if (request.getStatus() == 1) {
                auction.setStatus(Status.KHONG_HOAT_DONG);
            }
            return adAuctionRepository.save(auction);
        }
    }

    @Override
    @Transactional
    public Auction updateAuction(AdminUpdateAuctionRequest request) {
        Optional<Auction> findAuctionById = adAuctionRepository.findById(request.getId());
        if (!findAuctionById.isPresent()) {
            throw new RestApiException(Message.AUCTION_NOT_EXISTS);
        }
        Auction auction = findAuctionById.get();
        auction.setName(request.getName());
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
