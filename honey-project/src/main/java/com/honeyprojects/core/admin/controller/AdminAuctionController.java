package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminCreateAuctionRequest;
import com.honeyprojects.core.admin.model.request.AdminFindAuctionRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateAuctionRequest;
import com.honeyprojects.core.admin.model.response.AdminAuctionResponse;
import com.honeyprojects.core.admin.service.AdminAuctionService;
import com.honeyprojects.core.admin.service.AdminCategoryService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/censor/auction")
public class AdminAuctionController {

    @Autowired
    private AdminAuctionService adminAuctionService;

    @Autowired
    private AdminCategoryService adminCategoryService;

    @GetMapping("/list-auction")
    public ResponseObject getListAuction() {
        return new ResponseObject(adminAuctionService.getAllAuction());
    }


    @GetMapping("/list-category")
    public ResponseObject getAllListCategory() {
        return new ResponseObject(adminCategoryService.getAllListCategory());
    }

    @GetMapping("")
    public ResponseObject viewSemester(@ModelAttribute final AdminFindAuctionRequest request) {
        return new ResponseObject((adminAuctionService.findAllAuction(request)));
    }

    @GetMapping("/search")
    public ResponseObject searchAuction(final AdminFindAuctionRequest request) {
        PageableObject<AdminAuctionResponse> listAuction = adminAuctionService.findAllAuction(request);
        return new ResponseObject(listAuction);
    }

    @PostMapping("/add")
    public ResponseObject addAuction(@RequestBody AdminCreateAuctionRequest obj) {
        return new ResponseObject(adminAuctionService.addAuction(obj));
    }

    @PutMapping("/update/{id}")
    public ResponseObject updateAcution(@PathVariable("id") String id,
                                         @RequestBody AdminUpdateAuctionRequest obj) {
        obj.setId(id);
        return new ResponseObject(adminAuctionService.updateAuction(obj));
    }

    @PutMapping("/change-status/{id}")
    public ResponseObject changeAuctionStatus(@PathVariable("id") String id ) {
        return new ResponseObject(adminAuctionService.changeAuctionStatus(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseObject deleteAuction(@PathVariable("id") String id) {
        return new ResponseObject(adminAuctionService.deleteAuction(id));
    }

}
