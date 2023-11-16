package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminChangeStatusGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateConversionHistoryRequest;
import com.honeyprojects.core.admin.model.request.AdminHistoryApprovedSearchRequest;
import com.honeyprojects.core.admin.model.request.CensorChangeStatusRequest;
import com.honeyprojects.core.admin.model.request.CensorSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.AdminRequestConversionHistoryResponse;
import com.honeyprojects.core.admin.model.response.CensorAddHoneyRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorTransactionRequestResponse;
import com.honeyprojects.core.admin.service.AdminRequestConversionService;
import com.honeyprojects.core.admin.service.CensorRequestManagerService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.util.callApiPoint.model.request.FilterClassSubject;
import com.honeyprojects.util.callApiPoint.service.CallApiCommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;


@RestController
@RequestMapping("/api/censor/request-manager")
public class CensorRequestManagerRestController {
    @Autowired
    private CensorRequestManagerService requestManagerService;

    @Autowired
    private AdminRequestConversionService requestConversionService;

    @Autowired
    private CallApiCommonService callApiCommonService;

    @GetMapping
    private void testCall(@RequestParam(name = "test") String test) throws CertificateException, NoSuchAlgorithmException, KeyStoreException, IOException, KeyManagementException {
        FilterClassSubject classSubject = new FilterClassSubject();
        classSubject.setEmailStudent(test);
        callApiCommonService.callApiClassSubjectVM(classSubject);
    }

    @GetMapping("/add-point")
    public PageableObject<CensorAddHoneyRequestResponse> getHistoryAddPoint(CensorSearchHistoryRequest historyRequest) {
        return requestManagerService.getHistoryAddPoint(historyRequest);
    }

    @GetMapping("/history-request-conversion")
    public PageableObject<AdminRequestConversionHistoryResponse> getHistoryRequestConversion(AdminCreateConversionHistoryRequest historyRequest) {
        return requestConversionService.getHistoryConversionAdmin(historyRequest);
    }

    @GetMapping("/history-buy-gift")
    public PageableObject<AdminRequestConversionHistoryResponse> getHistoryBuyItem(AdminCreateConversionHistoryRequest historyRequest) {
        return requestConversionService.getHistoryBuyGiftAdmin(historyRequest);
    }


    @GetMapping("/transaction")
    public PageableObject<CensorTransactionRequestResponse> getHistoryTransaction(CensorSearchHistoryRequest historyRequest) {
        return requestManagerService.getHistoryTransaction(historyRequest);
    }

    @GetMapping("/request-manager/{id}")
    public ResponseObject getRequest(@PathVariable("id") String idRequest) {
        return new ResponseObject(requestManagerService.getRequest(idRequest));
    }

    @PutMapping("/change-status")
    public ResponseObject changeStatus(@RequestBody CensorChangeStatusRequest changeStatusRequest) {
        return new ResponseObject(requestManagerService.changeStatus(changeStatusRequest));
    }

    @PutMapping("/change-status-conversion")
    public ResponseObject changeStatusConversion(@RequestBody AdminChangeStatusGiftRequest request) {
        return new ResponseObject(requestManagerService.changeStatusConversion(request));
    }


    //UserAPi
    @GetMapping("/user-api")
    public ResponseObject getUserApiByCode(String username) {
        return new ResponseObject(requestManagerService.searchUser(username));
    }

    @GetMapping("/user-api/{id}")
    public ResponseObject getUserApiById(@PathVariable String id) {
        return new ResponseObject(requestManagerService.getUserById(id));
    }

    @GetMapping("/count-request")
    public ResponseObject getCountRequest(Integer type) {
        return new ResponseObject(requestManagerService.countRequest(type));
    }

    @GetMapping("/get-point-by-idStudent-idCategory")
    public ResponseObject getPointByIdStudentAndIdCategory(@RequestParam("studentId") String studentId, @RequestParam("honeyCategoryId") String honeyCategoryId) {
        return new ResponseObject(requestManagerService.getPointByIdStudentAndIdCategory(studentId, honeyCategoryId));
    }

    @GetMapping("/approved-history")
    public PageableObject<CensorTransactionRequestResponse> historyApproved(AdminHistoryApprovedSearchRequest dataSearch) {
        if (dataSearch.getStatus() == null) {
            return requestManagerService.getHistoryApprovedAllStatus(dataSearch);
        } else {
            return requestManagerService.getHistoryApprovedByStatus(dataSearch);
        }
    }

    @GetMapping("/list-request")
    public PageableObject<CensorTransactionRequestResponse> listRequests(AdminHistoryApprovedSearchRequest dataSearch) {
        if (dataSearch.getStatus() == null) {
            return requestManagerService.getListRequests(dataSearch);
        } else return requestManagerService.getListRequestsByStatus(dataSearch);
    }

    @GetMapping("/exchange-gifts")
    public PageableObject<CensorTransactionRequestResponse> exchangeGifts(AdminHistoryApprovedSearchRequest dataSearch) {
        if (dataSearch.getStatus() == null) {
            return requestManagerService.getExchangeGiftAllStatus(dataSearch);
        } else {
            return requestManagerService.getExchangeGiftByStatus(dataSearch);
        }
    }

}
