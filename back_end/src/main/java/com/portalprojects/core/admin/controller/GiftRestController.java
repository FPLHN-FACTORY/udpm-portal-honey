package com.portalprojects.core.admin.controller;

import com.portalprojects.core.admin.model.request.AdCreateGiftRequest;
import com.portalprojects.core.admin.service.GiftService;
import com.portalprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin/gift")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class GiftRestController {

    @Autowired
    private GiftService giftService;

    @GetMapping("")
    public ResponseObject getAll() {
        return new ResponseObject(giftService.getAll());
    }

    @PostMapping("/create")
    public ResponseObject create(@RequestBody AdCreateGiftRequest createGiftRequest) {
        return new ResponseObject(giftService.createGift(createGiftRequest));
    }

    @PutMapping("/update/{id}")
    public ResponseObject update(@PathVariable("id") String id,
                                 @RequestBody AdCreateGiftRequest createGiftRequest) {
        createGiftRequest.setId(id);
        return new ResponseObject(giftService.updateGift(createGiftRequest));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseObject delete(@PathVariable("id") String id) {
        return new ResponseObject(giftService.deleteGift(id));
    }

}
