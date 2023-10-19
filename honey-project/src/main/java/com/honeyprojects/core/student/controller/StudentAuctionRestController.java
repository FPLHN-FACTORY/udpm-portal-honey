package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.admin.model.request.AdminFindAuctionRequest;
import com.honeyprojects.core.admin.service.AdminAuctionService;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.student.model.request.auction.StudentAuctionFilterRequest;
import com.honeyprojects.core.student.service.StudentAuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/auction")
@RequiredArgsConstructor
public class StudentAuctionRestController {

    private final AdminAuctionService adminAuctionService;

    private final StudentAuctionService studentAuctionService;

    @GetMapping("/find-all")
    public ResponseObject findAll(AdminFindAuctionRequest request) {
        return new ResponseObject(adminAuctionService.findAll(request));
    }

    @GetMapping("/find-all-room")
    public ResponseObject findAllRoom(final StudentAuctionFilterRequest request) {
        return new ResponseObject(studentAuctionService.findAllRoomById(request));
    }
}
