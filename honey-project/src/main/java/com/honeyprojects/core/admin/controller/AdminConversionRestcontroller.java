package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminConversionRequest;
import com.honeyprojects.core.admin.model.request.AdminSearchConversionRequest;
import com.honeyprojects.core.admin.service.AdminCategoryService;
import com.honeyprojects.core.admin.service.AdminConversionService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/censor/conversion")
public class    AdminConversionRestcontroller {

    @Autowired
    AdminConversionService adminConversionService;

    @Autowired
    AdminCategoryService adminCategoryService;

    @GetMapping("/list-category")
    public ResponseObject getAllListCategory() {
        return new ResponseObject(adminCategoryService.getAllListCategory());
    }

    @PostMapping("/add")
    public ResponseObject addConversion(@RequestBody AdminConversionRequest request){
        return new ResponseObject(adminConversionService.addConversion(request));
    }

    @PutMapping("/update/{id}")
    public ResponseObject updateConversion(@RequestBody AdminConversionRequest request, @PathVariable String id){
        return new ResponseObject(adminConversionService.updateConversion(request,id));
    }

    @GetMapping("/list-conversion")
    public ResponseObject getAll(){
        return new ResponseObject(adminConversionService.getAllConversion());
    }

    @GetMapping("/page")
    public ResponseObject getPage(AdminSearchConversionRequest request){
        return new ResponseObject(adminConversionService.getPage(request));
    }

    @GetMapping("/get-one/{id}")
    public ResponseObject getOne(@PathVariable String id){
        return new ResponseObject(adminConversionService.getOneConversion(id));
    }

    @GetMapping("/search-by-name")
    public ResponseObject searchByName(@RequestParam(name = "textSearch") String textSearch, @RequestParam("page") Integer page){
        return new ResponseObject(adminConversionService.searchConversion(page,textSearch));
    }
}
