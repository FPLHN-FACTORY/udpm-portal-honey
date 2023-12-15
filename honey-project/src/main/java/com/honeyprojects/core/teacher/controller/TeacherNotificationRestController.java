package com.honeyprojects.core.teacher.controller;

import com.honeyprojects.core.admin.model.request.AdminNotificationRequest;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.teacher.service.TeacherNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/teacher/notifications")
public class TeacherNotificationRestController {

    @Autowired
    private TeacherNotificationService teacherNotificationService;

    @GetMapping("")
    public ResponseObject findNotificationApproval(final AdminNotificationRequest request) {
        return new ResponseObject(teacherNotificationService.getAllNotification(request));
    }

    @GetMapping("/count")
    public Integer getNumberNotifications() {
        return teacherNotificationService.getNumberNotifications();
    }

    @PutMapping("/update-all-status")
    void updateAllStatus(){
        teacherNotificationService.updateAllStatus();
    }

    @PutMapping("/update-status/{id}")
    public ResponseObject updateStatus(@PathVariable("id") String id) {
        return new ResponseObject(teacherNotificationService.updateStatus(id));
    }
}
