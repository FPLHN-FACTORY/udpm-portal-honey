package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.*;
import com.honeyprojects.core.admin.service.AdminClubService;
import com.honeyprojects.core.admin.service.AdminGiftService;
import com.honeyprojects.core.common.base.ResponseObject;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/censor/club")
public class AdminClubRestController {
    @Autowired
    private AdminClubService adminClubService;

    @GetMapping("")
    public ResponseObject getAllGiftByAdmin(final AdminClubRequest request){
        return new ResponseObject(adminClubService.getAllCategoryByAdmin(request));
    }

    @GetMapping("/list-gift")
    public ResponseObject getAllListGift(){
        return new ResponseObject(adminClubService.getAllListGift());
    }

    @GetMapping("/get-one/{id}")
    public ResponseObject getOne(@PathVariable("id") String id){
        return new ResponseObject(adminClubService.getOne(id));
    }

    @PostMapping("")
    public ResponseObject addGift(@Valid @RequestBody AdminCreateClubRequest request){
        return new ResponseObject(adminClubService.addClub(request));
    }

    @PutMapping("/{id}")
    public ResponseObject updateGift(@Valid @RequestBody AdminUpdateClubRequest request, @PathVariable("id") String id){
        return new ResponseObject(adminClubService.updateClub(request,id));
    }

    @PutMapping("/delete/{id}")
    public ResponseObject updateStatusGift(@RequestBody AdminUpdateClubRequest request, @PathVariable("id") String id){
        return new ResponseObject(adminClubService.updateStatusClub(request,id));
    }

    @DeleteMapping("/{id}")
    public void deleteGift(@PathVariable("id") String id){
        adminClubService.deleteById(id);
    }
}
