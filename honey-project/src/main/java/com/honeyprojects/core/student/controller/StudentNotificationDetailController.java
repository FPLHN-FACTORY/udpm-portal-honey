package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.student.service.StudentNotificationDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/notification-detail")
public class StudentNotificationDetailController {

    @Autowired
    private UdpmHoney udpmHoney;

    @Autowired
    private StudentNotificationDetailService studentNotificationDetailService;

    @GetMapping("/{idNotification}")
    public ResponseObject getAllNotificationDetailByIdNotification(@PathVariable String idNotification) {
        return new ResponseObject(studentNotificationDetailService.getAllNotificationDetailByIdNotification(udpmHoney.getIdUser(), idNotification));
    }

    @PostMapping("/receiving/{id}")
    public ResponseObject receivingGiftsFromNotifications(@RequestBody List<String> lstIdNotificationDetail, @PathVariable String id) {
        return new ResponseObject(studentNotificationDetailService.receivingGiftsFromNotifications(lstIdNotificationDetail, udpmHoney.getIdUser(), id));
    }

    @GetMapping("/notification/{id}")
    public ResponseObject getNotificationById(@PathVariable String id) {
        return new ResponseObject(studentNotificationDetailService.getNotificationById(id));
    }

    @PutMapping("/updateStatus/{id}")
    public ResponseObject updateStatus(@PathVariable String id) {
        return new ResponseObject(studentNotificationDetailService.updateStatus(id));
    }
}
