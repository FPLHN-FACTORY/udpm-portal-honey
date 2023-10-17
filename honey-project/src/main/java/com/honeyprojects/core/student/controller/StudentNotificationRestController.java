package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.BaseController;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.student.model.request.StudentNotificationRequest;
import com.honeyprojects.core.student.service.StudentNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/notification")
public class StudentNotificationRestController extends BaseController {

    @Autowired
    private UdpmHoney udpmHoney;

    @Autowired
    private StudentNotificationService studentNotificationService;

    @GetMapping("")
    public ResponseObject getAllNotification(final StudentNotificationRequest request) {
        return new ResponseObject(studentNotificationService.fillAllNotification(udpmHoney.getIdUser(), request));
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> countNotification() {
        int count = studentNotificationService.countNotification(udpmHoney.getIdUser());
        return ResponseEntity.ok().body(count);
    }

    @PutMapping("/update-status/{id}")
    public ResponseObject updateStatus(@PathVariable("id") String id) {
        return new ResponseObject(studentNotificationService.updateStatus(id));
    }

    @GetMapping("/get-one/{id}")
    public ResponseObject getOne(@PathVariable("id") String id) {
        return new ResponseObject(studentNotificationService.getOne(id));
    }

    @DeleteMapping("/delete-notification/{id}")
    public void deleteNotification(@PathVariable("id") String id) {
        studentNotificationService.deleteNotification(id);
    }

    @PutMapping("/update-all-status")
    public void updateAllStatus() {
        studentNotificationService.updateAllStatus();
    }

    @MessageMapping("/create-notification-user/{userId}")
    @SendTo("/portal-honey/create-notification-user/{userId}")
    private ResponseObject notificationUser( @DestinationVariable String userId){
        return new ResponseObject(studentNotificationService.countNotification(userId));
    }
}