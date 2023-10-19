package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.student.model.request.auction.StudentAuctionFilterRequest;
import com.honeyprojects.core.student.model.response.StudentAuctionResponse;
import com.honeyprojects.core.student.repository.StudentAuctionRepository;
import com.honeyprojects.core.student.service.StudentAuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentAuctionServiceImpl implements StudentAuctionService {

    private final StudentAuctionRepository studentAuctionRepository;

    @Override
    public List<StudentAuctionResponse> findAllRoomById(StudentAuctionFilterRequest rep) {
        return studentAuctionRepository.findAllRoomById(rep);
    }
}
