package com.honeyprojects.core.student.service;

import com.honeyprojects.core.student.model.request.auction.StudentAuctionFilterRequest;
import com.honeyprojects.core.student.model.response.StudentAuctionResponse;

import java.util.List;

public interface StudentAuctionService {

    List<StudentAuctionResponse> findAllRoomById(StudentAuctionFilterRequest rep);
}
