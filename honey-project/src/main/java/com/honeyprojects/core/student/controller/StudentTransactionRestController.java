package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.student.model.request.StudentTransactionRequest;
import com.honeyprojects.core.student.service.StudentTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/transaction")
public class StudentTransactionRestController {
    @Autowired
    private StudentTransactionService transactionService;

    @GetMapping("/search-student")
    public ResponseObject searchStudent(String email) {
        return new ResponseObject(transactionService.searchUser(email));
    }
    @GetMapping("/category")
    public ResponseObject listCategory() {
        return new ResponseObject(transactionService.getCategory());
    }
    @GetMapping("/get-honey")
    public ResponseObject getPoint(@RequestParam String categoryId) {
        return new ResponseObject(transactionService.getHoney(categoryId));
    }

    @GetMapping("/get-student")
    public ResponseObject getStudent(String id) {
        return new ResponseObject(transactionService.getUserById(id));
    }
    @GetMapping("/get-gift")
    public ResponseObject getGift() {
        return new ResponseObject(transactionService.getGiftTransactions());
    }

    @GetMapping("/get-user-login")
    public String getUserLogin() {
        return transactionService.getUserLogin();
    }

    @MessageMapping("/send-transaction/{id}")
    @SendTo("/portal-honey/{id}/transaction")
    public ResponseObject sendTransaction(@RequestBody StudentTransactionRequest request) {
        return new ResponseObject(transactionService.sendTransaction(request));
    }

    @MessageMapping("/accept-transaction/{id}")
    @SendTo("/portal-honey/transaction/{id}/accept")
    public ResponseObject acceptTransaction(@RequestBody StudentTransactionRequest request) {
        System.out.println(request);
        return new ResponseObject(transactionService.sendTransaction(request));
    }
    @MessageMapping("/transaction/{id}/cancel")
    @SendTo("/portal-honey/transaction/{id}/cancel")
    public Boolean cancelTransaction() {
        return true;
    }

}
