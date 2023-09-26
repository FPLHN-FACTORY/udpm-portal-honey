package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminChestRequest;
import com.honeyprojects.core.admin.service.AdminChestService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/censor/chest")
public class AdminChestRestController {

    @Autowired
    private AdminChestService chestService;

    @GetMapping("")
    public ResponseObject getListChest(final AdminChestRequest request) {
        return new ResponseObject(chestService.getAllChestByAdmin(request));
    }

}
