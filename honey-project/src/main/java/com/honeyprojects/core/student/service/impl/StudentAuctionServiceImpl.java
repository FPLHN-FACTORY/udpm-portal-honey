package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.student.model.request.auction.StudentAuctionCreateRequest;
import com.honeyprojects.core.student.model.request.auction.StudentAuctionRoomFilterRequest;
import com.honeyprojects.core.student.model.response.StudentAuctionResponse;
import com.honeyprojects.core.student.repository.StudentAuctionRepository;
import com.honeyprojects.core.student.repository.StudentHoneyRepository;
import com.honeyprojects.core.student.service.StudentAuctionService;
import com.honeyprojects.entity.Auction;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.configws.modelmessage.MessageAuction;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.exception.rest.MessageHandlingException;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentAuctionServiceImpl implements StudentAuctionService {

    private final StudentAuctionRepository studentAuctionRepository;

    private final StudentHoneyRepository studentHoneyRepository;

    @Override
    public Auction getOneByid(String id) {
        var auction = studentAuctionRepository.findById(id);
        if (!auction.isPresent()) {
            throw new RestApiException("Không tìm thấy bàn đấu giá");
        }
        return auction.get();
    }

    @Override
    public Auction add(StudentAuctionCreateRequest request) {
        System.out.println(request);
        long fromdate = System.currentTimeMillis();
        var auction = new Auction();
        auction.setJump(new BigDecimal(request.getJump()));
        auction.setStartingPrice(new BigDecimal(request.getStartingPrice()));
        auction.setFromDate(fromdate);
        auction.setToDate(fromdate + Integer.valueOf(request.getTime()) * 3600 * 1000L);
        auction.setName(request.getName());
        auction.setGiftId(request.getIdGift());
        auction.setHoneyCategoryId(request.getIdCategory());
        auction.setStatus(Status.HOAT_DONG);

        return studentAuctionRepository.save(auction);
    }

    @Override
    public Auction updateLastPrice(MessageAuction messageAuction) {
        var auction = studentAuctionRepository.findById(messageAuction.getIdAuction());
        if (!auction.isPresent()) {
            throw new RestApiException("Không tìm thấy phiên dấu giá.");
        }
        Honey honey = studentHoneyRepository.findByStudentIdAndHoneyCategoryId(messageAuction.getIdUser(), auction.get().getHoneyCategoryId());
        if (honey == null || honey.getHoneyPoint() < messageAuction.getLastPrice()) {
            throw new MessageHandlingException("Không đủ mật ong.");
        }
        auction.get().setLastPrice(new BigDecimal(messageAuction.getLastPrice()));
        studentAuctionRepository.save(auction.get());
        return auction.get();
    }


    @Override
    public PageableObject<StudentAuctionResponse> findAllAuctionRoom(StudentAuctionRoomFilterRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<StudentAuctionResponse> page = studentAuctionRepository.findAllAuctionRoom(request, pageable);
        return new PageableObject<>(page);
    }
}
