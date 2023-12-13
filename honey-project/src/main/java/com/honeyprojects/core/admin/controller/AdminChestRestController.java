package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminChestRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateChestRequest;
import com.honeyprojects.core.admin.service.AdminChestService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("")
    public ResponseObject addChest(@RequestBody AdminCreateChestRequest request) {
        return new ResponseObject(chestService.addChest(request));
    }

    @PutMapping("/delete/{id}")
    public void deleteChest(@PathVariable("id") String id) {
        chestService.deleteChest(id);
    }

    @PutMapping("/{id}")
    public ResponseObject updateChest(@PathVariable("id") String id,@RequestBody AdminCreateChestRequest request) {
        return new ResponseObject(chestService.updateChest(request, id));
    }

}
