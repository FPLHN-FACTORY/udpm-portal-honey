package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminCreateConversionRequest;
import com.honeyprojects.core.admin.repository.AdConversionRepository;
import com.honeyprojects.core.admin.service.AdminConversionService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/censor/conversion")
public class AdminConversionRestcontroller {

    @Autowired
    AdminConversionService adminConversionService;

    @PostMapping("/add")
    public ResponseObject addConversion(@RequestBody AdminCreateConversionRequest request){
        return new ResponseObject(adminConversionService.addConversion(request));
    }

    @GetMapping("")
    public ResponseObject getAll(){
        return new ResponseObject(adminConversionService.getAllConversion());
    }
}
