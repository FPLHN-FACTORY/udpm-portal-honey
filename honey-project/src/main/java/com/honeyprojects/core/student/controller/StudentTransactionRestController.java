package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.student.model.request.StudentChangeStatusHistoryRequest;
import com.honeyprojects.core.student.model.request.StudentSearchHistoryRequest;
import com.honeyprojects.core.student.model.request.StudentTransactionRequest;
import com.honeyprojects.core.student.model.response.StudentHistoryResponse;
import com.honeyprojects.core.student.service.StudentTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/transaction")
public class StudentTransactionRestController {
    @Autowired
    private StudentTransactionService transactionService;


    @GetMapping("/category")
    public ResponseObject getCategory(String recipientId) {
        return new ResponseObject(transactionService.getCategory(recipientId));
    }

    @PutMapping("/change-status")
    public ResponseObject changeStatus(@RequestBody StudentChangeStatusHistoryRequest changeStatusRequest) {
        return new ResponseObject(transactionService.changeStatus(changeStatusRequest));
    }

    @GetMapping("/get-honey")
    public ResponseObject getPointStudent(String categoryId) {
        return new ResponseObject(transactionService.getHoney(categoryId));
    }

    @GetMapping("/verify")
    public ResponseObject verify() {
        return new ResponseObject(transactionService.genCodeVerify());
    }

    @GetMapping("/check-verify")
    private Boolean checkVerify(String code) {
        return transactionService.checkVerify(code);
    }

    @PostMapping("")
    public ResponseObject transaction(StudentTransactionRequest studentTransactionRequest) {
        return new ResponseObject(transactionService.trasaction(studentTransactionRequest));
    }

    @GetMapping("/get-history")
    public PageableObject<StudentHistoryResponse> getHistory(StudentSearchHistoryRequest historyRequest) {
        return transactionService.getHistory(historyRequest);
    }

    @GetMapping("/search-student")
    public ResponseObject searchStudent(String username) {
        return new ResponseObject(transactionService.searchUser(username));
    }
    @GetMapping("/get-student")
    public ResponseObject getStudent(String id) {
        return new ResponseObject(transactionService.getUserById(id));
    }

    @GetMapping("/get-user-login")
    public String getUserLogin() {
        return transactionService.getUserLogin();
    }

    @GetMapping("/send")
    public ResponseObject sendTransaction(String userName, String idTransaction) {
        return new ResponseObject(transactionService.sendTransaction(userName, idTransaction));
    }
}
