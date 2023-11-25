package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.admin.model.request.AdminFindAuctionRequest;
import com.honeyprojects.core.admin.service.AdminAuctionService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.student.model.request.auction.StudentAuctionCreateRequest;
import com.honeyprojects.core.student.model.request.auction.StudentAuctionRoomFilterRequest;
import com.honeyprojects.core.student.model.response.StudentAuctionResponse;
import com.honeyprojects.core.student.service.StudentAuctionService;
import com.honeyprojects.entity.Auction;
import com.honeyprojects.infrastructure.configws.modelmessage.MessageAuction;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/auction")
@RequiredArgsConstructor
public class StudentAuctionRestController {

    @Autowired
    private AdminAuctionService adminAuctionService;

    @Autowired
    private StudentAuctionService studentAuctionService;


    @GetMapping("/find-all")
    public ResponseObject findAll(AdminFindAuctionRequest request) {
        return new ResponseObject(adminAuctionService.findAll(request));
    }

    @GetMapping("/get-one-aution")
    public ResponseObject getOneAuctionById(@RequestParam("id") String id) {
        return new ResponseObject(studentAuctionService.getOneByid(id));
    }

    @MessageMapping("/add-auction")
    @SendTo("/portal-honey/add-auction")
    public ResponseObject add(@RequestBody StudentAuctionCreateRequest request) {
        Auction result = studentAuctionService.add(request);
        return new ResponseObject(result);
    }


    @GetMapping("/search")
    public ResponseObject searchAuctionRoom(final StudentAuctionRoomFilterRequest request) {
        PageableObject<StudentAuctionResponse> listAuction = studentAuctionService.findAllAuctionRoom(request);
        return new ResponseObject(listAuction);
    }

    @MessageMapping("/update-last-price-auction")
    @SendTo("/portal-honey/update-last-price-auction")
    public ResponseObject updateLastPrice(@RequestBody MessageAuction messageAuction) {
        return new ResponseObject(studentAuctionService.updateLastPrice(messageAuction));
    }


}
