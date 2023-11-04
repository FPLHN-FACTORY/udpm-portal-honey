package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.BaseController;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.student.model.request.StudentNotificationRequest;
import com.honeyprojects.core.student.service.StudentNotificationService;
import com.honeyprojects.infrastructure.configws.WebSocketSessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/notification")
@CrossOrigin("*")
public class StudentNotificationRestController extends BaseController {

    @Autowired
    private UdpmHoney udpmHoney;

    @Autowired
    private WebSocketSessionManager webSocketSessionManager;

    @Autowired
    private StudentNotificationService studentNotificationService;

    @MessageMapping("/create-notification-user")
    @SendTo("/portal-honey/create-notification-user")
    private ResponseObject notificationUser(StompHeaderAccessor headerAccessor) {
        return new ResponseObject(studentNotificationService.countNotification(
                webSocketSessionManager.getSessionInfo(headerAccessor.getSessionId()).getId()));
    }

    @GetMapping("")
    public ResponseObject getAllNotification(final StudentNotificationRequest request) {
        return new ResponseObject(studentNotificationService.fillAllNotification(udpmHoney.getIdUser(), request));
    }

    @GetMapping("/list-notification")
    public ResponseObject getListNotification(final StudentNotificationRequest request) {
        return new ResponseObject(studentNotificationService.fillListNotification(udpmHoney.getIdUser(), request));
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

}
