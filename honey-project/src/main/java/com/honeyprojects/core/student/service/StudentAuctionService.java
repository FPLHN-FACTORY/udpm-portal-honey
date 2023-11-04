package com.honeyprojects.core.student.service;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.student.model.request.auction.StudentAuctionCreateRequest;
import com.honeyprojects.core.student.model.request.auction.StudentAuctionRoomFilterRequest;
import com.honeyprojects.core.student.model.response.StudentAuctionResponse;
import com.honeyprojects.entity.Auction;
import com.honeyprojects.infrastructure.configws.modelmessage.MessageAuction;

public interface StudentAuctionService {

    Auction getOneByid(String id);

    Auction add(StudentAuctionCreateRequest request);

    Auction updateLastPrice(MessageAuction messageAuction);

    PageableObject<StudentAuctionResponse> findAllAuctionRoom(StudentAuctionRoomFilterRequest request);

}
