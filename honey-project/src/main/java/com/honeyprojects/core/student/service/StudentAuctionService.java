package com.honeyprojects.core.student.service;

import com.honeyprojects.core.student.model.request.auction.StudentAuctionCreateRequest;
import com.honeyprojects.core.student.model.request.auction.StudentAuctionFilterRequest;
import com.honeyprojects.core.student.model.response.StudentAuctionResponse;
import com.honeyprojects.entity.Auction;

import java.util.List;

public interface StudentAuctionService {

    List<StudentAuctionResponse> findAllRoomById(StudentAuctionFilterRequest rep);

    Auction getOneByid(String id);

    StudentAuctionResponse getOneRoomById(String id);

    Auction add(StudentAuctionCreateRequest request);

}
