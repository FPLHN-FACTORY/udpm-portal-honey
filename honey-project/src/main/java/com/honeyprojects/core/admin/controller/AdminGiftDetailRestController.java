package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminAddGiftDetailRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateGiftDetailRequest;
import com.honeyprojects.core.admin.service.AdminGiftDetailService;
import com.honeyprojects.core.common.base.ResponseObject;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/censor/gift-detail")
public class AdminGiftDetailRestController {
    @Autowired
    private AdminGiftDetailService service;

    @PostMapping("")
    public ResponseObject addGiftDetail(@Valid @ModelAttribute AdminAddGiftDetailRequest request){
        return new ResponseObject(service.add(request));
    }

    @GetMapping("/list")
    public ResponseObject getList(@RequestParam String idGift){
        return new ResponseObject(service.listGiftDetailByGiftId(idGift));
    }

    @PutMapping("/{id}")
    public ResponseObject updateGiftDetail(@Valid @ModelAttribute AdminUpdateGiftDetailRequest request, @PathVariable String id){
        return new ResponseObject(service.update(request,id));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGiftDetail(@PathVariable String id){
        service.deleteById(id);
    }

}
