package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.response.AdNotificationResponse;
import com.honeyprojects.core.admin.service.AdNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/censor/notifications")
public class AdNotificationRestController {

    @Autowired
    private AdNotificationService adNotificationService;

    @GetMapping("")
    public List<AdNotificationResponse> getNotifications() {
        return adNotificationService.getAllNotifications();
    }

    @GetMapping("/count")
    public Integer getNumberNotifications() {
        return adNotificationService.getNumberNotifications();
    }
}
