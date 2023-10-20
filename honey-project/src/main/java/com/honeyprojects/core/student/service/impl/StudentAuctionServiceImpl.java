package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.student.model.request.auction.StudentAuctionCreateRequest;
import com.honeyprojects.core.student.model.request.auction.StudentAuctionFilterRequest;
import com.honeyprojects.core.student.model.response.StudentAuctionResponse;
import com.honeyprojects.core.student.repository.StudentAuctionRepository;
import com.honeyprojects.core.student.repository.StudentHoneyRepository;
import com.honeyprojects.core.student.service.StudentAuctionService;
import com.honeyprojects.entity.Auction;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentAuctionServiceImpl implements StudentAuctionService {

    private final StudentAuctionRepository studentAuctionRepository;

    private final StudentHoneyRepository studentHoneyRepository;

    @Override
    public List<StudentAuctionResponse> findAllRoomById(StudentAuctionFilterRequest rep) {
        return studentAuctionRepository.findAllRoomById(rep);
    }

    @Override
    public Auction getOneByid(String id) {
        var auction = studentAuctionRepository.findById(id);
        if(!auction.isPresent()){
            throw new RestApiException("Không tìm thấy bàn đấu giá");
        }
        return auction.get();
    }

    @Override
    public Auction add(StudentAuctionCreateRequest request) {
        long fromdate = System.currentTimeMillis();
        var auction = new Auction();
        auction.setIdRoom(request.getIdAuction());
        auction.setJump(new BigDecimal(request.getJump()));
        auction.setStartingPrice(new BigDecimal(request.getStartingPrice()));
        auction.setFromDate(fromdate);
        auction.setToDate(fromdate + Integer.valueOf(request.getTime())* 3600 * 1000L);
        auction.setName(request.getName());
        auction.setGiftId(request.getIdGift());
        auction.setHoney(new BigDecimal(request.getHoney()));
        auction.setHoneyCategoryId(request.getIdCategory());
        auction.setStatus(Status.HOAT_DONG);

        // todo update honey to user
        var honey = studentHoneyRepository.getOneByIdUser(request.getIdUser());
        honey.setHoneyPoint(honey.getHoneyPoint() - Integer.valueOf(request.getHoney()));
        studentHoneyRepository.save(honey);

        return studentAuctionRepository.save(auction);
    }
}
