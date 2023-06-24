package com.portalprojects.core.admin.controller;

import com.portalprojects.core.admin.service.GiftDetailService;
import com.portalprojects.core.common.base.ResponseObject;
import com.portalprojects.entity.GiftDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/admin/gift-history")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class GiftDetailRestController {

    @Autowired
    private GiftDetailService giftDetailService;

    @PostMapping("/create")
    public ResponseObject create(@RequestBody List<GiftDetail> lists) {
        return new ResponseObject(giftDetailService.createGiftDetail(lists));
    }

    @GetMapping("/{id}")
    public ResponseObject getGiftDetail(@PathVariable("id") String id){
        return new ResponseObject(giftDetailService.getGiftDetail(id));
    }
}
