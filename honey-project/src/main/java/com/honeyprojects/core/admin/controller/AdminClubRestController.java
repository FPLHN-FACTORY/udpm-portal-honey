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
    public ResponseObject getAllGiftByAdmin(final AdminClubRequest request) {
        return new ResponseObject(adminClubService.getAllCategoryByAdmin(request));
    }

    @GetMapping("/gift")
    public ResponseObject findGiftInClub(final AdminGiftRequest request) {
        return new ResponseObject(adminClubService.findGiftInClub(request));
    }

    @GetMapping("/gift-not-in-club")
    public ResponseObject findGiftNotInClub(final AdminGiftRequest request) {
        return new ResponseObject(adminClubService.findGiftNotInClub(request));
    }

    @GetMapping("/list-gift")
    public ResponseObject getAllListGift() {
        return new ResponseObject(adminClubService.getAllListGift());
    }

    @GetMapping("/{id}")
    public ResponseObject getOne(@PathVariable("id") String id) {
        return new ResponseObject(adminClubService.getOne(id));
    }

    @PostMapping("")
    public ResponseObject addClub(@Valid @RequestBody AdminCreateClubRequest request) {
        return new ResponseObject(adminClubService.addClub(request));
    }

    @PostMapping("/create/gift-club")
    public ResponseObject addClubGift(@Valid @RequestBody AdminCreateClubGiftRequest request) {
        return new ResponseObject(adminClubService.addGiftClub(request));
    }

    @PutMapping("/update/{id}")
    public ResponseObject updateGift(@Valid @RequestBody AdminUpdateClubRequest request, @PathVariable("id") String id) {
        return new ResponseObject(adminClubService.updateClub(request, id));
    }

    @PutMapping("/delete/{id}")
    public ResponseObject updateStatusGift(@RequestBody AdminUpdateClubRequest request, @PathVariable("id") String id) {
        return new ResponseObject(adminClubService.updateStatusClub(request, id));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGift(@PathVariable("id") String id) {
        adminClubService.deleteById(id);
    }
}
