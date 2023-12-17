package com.honeyprojects.core.president.controller;

import com.honeyprojects.core.admin.model.request.AdminNotificationRequest;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.president.service.PresidentNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/president/notifications")
public class PresidentNotificationRestController {

    @Autowired
    private PresidentNotificationService presidentNotificationService;

    @GetMapping("")
    public ResponseObject findNotificationApproval(final AdminNotificationRequest request) {
        return new ResponseObject(presidentNotificationService.getAllNotification(request));
    }

    @GetMapping("/count")
    public Integer getNumberNotifications() {
        return presidentNotificationService.getNumberNotifications();
    }

    @PutMapping("/update-all-status")
    void updateAllStatus(){
        presidentNotificationService.updateAllStatus();
    }

    @PutMapping("/update-status/{id}")
    public ResponseObject updateStatus(@PathVariable("id") String id) {
        return new ResponseObject(presidentNotificationService.updateStatus(id));
    }
}
