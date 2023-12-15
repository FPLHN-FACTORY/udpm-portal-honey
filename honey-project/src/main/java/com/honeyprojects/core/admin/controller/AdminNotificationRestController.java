package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminNotificationRequest;
import com.honeyprojects.core.admin.service.AdNotificationService;
import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/censor/notifications")
public class AdminNotificationRestController {

    @Autowired
    private AdNotificationService adNotificationService;

    @GetMapping("")
    public ResponseObject findNotificationApproval(final AdminNotificationRequest request) {
        return new ResponseObject(adNotificationService.getAllNotification(request));
    }

    @GetMapping("/count")
    public Integer getNumberNotifications() {
        return adNotificationService.getNumberNotifications();
    }

    @PutMapping("/update-all-status")
    void updateAllStatus(){
        adNotificationService.updateAllStatus();
    }

    @PutMapping("/update-status/{id}")
    public ResponseObject updateStatus(@PathVariable("id") String id) {
        return new ResponseObject(adNotificationService.updateStatus(id));
    }
}
