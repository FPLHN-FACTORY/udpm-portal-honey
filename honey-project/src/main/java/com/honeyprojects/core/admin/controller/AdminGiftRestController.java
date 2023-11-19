package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminCreateGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateGiftRequest;
import com.honeyprojects.core.admin.service.AdminGiftService;
import com.honeyprojects.core.common.base.ResponseObject;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

//import javax.validation.Valid;

@RestController
@RequestMapping("/api/censor/gift")
public class AdminGiftRestController {

    @Autowired
    private AdminGiftService adminGiftService;

    @GetMapping("")
    public ResponseObject getAllGiftByAdmin(final AdminGiftRequest request) {
        return new ResponseObject(adminGiftService.getAllCategoryByAdmin(request));
    }

    @GetMapping("/list-gift")
    public ResponseObject getAllListGift() {
        return new ResponseObject(adminGiftService.getAllListGift());
    }

    @GetMapping("/get-one/{id}")
    public ResponseObject getOne(@PathVariable("id") String id) {
        return new ResponseObject(adminGiftService.getOne(id));
    }

    @PostMapping("")
    public ResponseObject addGift(@Valid @ModelAttribute AdminCreateGiftRequest request) throws IOException {
        return new ResponseObject(adminGiftService.addGift(request));
    }

    @PutMapping("/{id}")
    public ResponseObject updateGift(@Valid @ModelAttribute AdminUpdateGiftRequest request, @PathVariable("id") String id) throws IOException {
        return new ResponseObject(adminGiftService.updateGift(request, id));
    }

    @PutMapping("/delete/{id}")
    public ResponseObject updateStatusGift(@PathVariable("id") String id) {
        return new ResponseObject(adminGiftService.updateStatusGift(id));
    }

    @DeleteMapping("/{id}")
    public void deleteGift(@PathVariable("id") String id) {
        adminGiftService.deleteById(id);
    }

}
