package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminCreateChestGiftRequest;
import com.honeyprojects.core.admin.service.AdminChestGiftService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/censor/chest-gift")
public class AdminChestGiftRestController {

    @Autowired
    private AdminChestGiftService chestGiftService;

    @DeleteMapping("/delete/{id}")
    public void deleteChestGift(@PathVariable("id") String chestId) {
        chestGiftService.deleteChestGift(chestId);
    }

    @GetMapping("/{id}")
    public ResponseObject getChestGift(@PathVariable("id") String chestId) {
        return new ResponseObject(chestGiftService.getChestGift(chestId));
    }

    @PostMapping("/add-gift")
    public void addGiftsToChest(@RequestBody AdminCreateChestGiftRequest request) {
        chestGiftService.addGiftsToChest(request);
    }

    @GetMapping("/list-gift")
    public ResponseObject getListGift(@RequestParam("id") String idChest) {
        return new ResponseObject(chestGiftService.findGiftNotJoinChest(idChest));
    }

    @DeleteMapping("/delete-gift")
    public ResponseObject deleteGiftInChest(@RequestBody AdminCreateChestGiftRequest request) {
        return new ResponseObject(chestGiftService.deleteGiftInChest(request));
    }

}
