package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.student.model.request.StudentArchiveFilterRequest;
import com.honeyprojects.core.student.model.request.StudentArchiveOpenChestRequest;
import com.honeyprojects.core.student.model.request.StudentGetArchiveChestRequest;
import com.honeyprojects.core.student.model.request.StudentGetArchiveGiftRequest;
import com.honeyprojects.core.student.model.request.StudentRequestChangeGift;
import com.honeyprojects.core.student.model.response.StudentArchiveGetChestResponse;
import com.honeyprojects.core.student.model.response.StudentArchiveResponse;
import com.honeyprojects.core.student.model.response.StudentGetListGiftResponse;
import com.honeyprojects.core.student.service.StudentArchiveService;
import com.honeyprojects.infrastructure.contant.SessionConstant;
import com.honeyprojects.util.callApiPoint.model.request.FilterClassSubject;
import com.honeyprojects.util.callApiPoint.model.request.FilterScoreTemplate;
import com.honeyprojects.util.callApiPoint.model.request.FilterScoreTemplateVM;
import com.honeyprojects.util.callApiPoint.model.response.ClassSubjectVM;
import com.honeyprojects.util.callApiPoint.model.response.ScoreTemplate;
import com.honeyprojects.util.callApiPoint.model.response.ScoreTemplateVM;
import com.honeyprojects.util.callApiPoint.service.CallApiCommonService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/student/archive")
public class StudentArchiveController {
    @Autowired
    private StudentArchiveService service;

    @Autowired
    private CallApiCommonService callApiCommonService;

    @Autowired
    private HttpSession session;

    @PostMapping("/list-class")
    public List<ClassSubjectVM> getListClass() {
        FilterClassSubject filterClassSubject = new FilterClassSubject();
        filterClassSubject.setEmailStudent(session.getAttribute(SessionConstant.EMAIL).toString());
        return callApiCommonService.callApiClassSubjectVM(filterClassSubject);
    }

    @PostMapping("/score-class")
    public List<ScoreTemplate> getListScore(@RequestBody FilterScoreTemplate filterScoreTemplate) {
        return callApiCommonService.callApiScoreTemplate(filterScoreTemplate);
    }

    @PostMapping("/score-student")
    public List<ScoreTemplateVM> getListScoreOfStudent(@RequestBody FilterScoreTemplateVM filterScoreTemplate) {
        return callApiCommonService.callApiScoreTemplateVM(filterScoreTemplate);
    }

    @GetMapping("")
    public PageableObject<StudentArchiveResponse> getAllArchiveByIdStudent(StudentArchiveFilterRequest filterRequest) {
        return service.getAllGiftArchive(filterRequest);
    }

    @GetMapping("/list-gift")
    public PageableObject<StudentGetListGiftResponse> getListGift(StudentArchiveFilterRequest filterRequest) {
        return service.getListGift(filterRequest);
    }

    @GetMapping("/{id}")
    public ResponseObject detailArchive(@PathVariable("id") String id) {
        return new ResponseObject(service.getArchiveGift(id));
    }

    @PostMapping("/use-gift")
    public ResponseObject studentUsingGift(@RequestBody StudentRequestChangeGift request) {
        return new ResponseObject(service.studentUsingGift(request));
    }

    @PostMapping("/open-chest")
    public ResponseObject openChest(@RequestBody StudentArchiveOpenChestRequest request) {
        return new ResponseObject(service.openChest(request));
    }

    @PutMapping("/{id}")
    public ResponseObject updateArchiveGift(@PathVariable("id") String id) {
        return new ResponseObject(service.updateArchiveGift(id));
    }

    @GetMapping("/list-chest")
    public PageableObject<StudentArchiveGetChestResponse> getChestToArchive(StudentArchiveFilterRequest filterRequest) {
        return service.getChestToArchive(filterRequest);
    }

    @GetMapping("/detail")
    public StudentArchiveResponse detailArchiveGift(StudentGetArchiveGiftRequest request) {
        return service.detailArchiveGift(request);
    }

    @GetMapping("/detail-chest")
    public StudentArchiveGetChestResponse detailArchiveChest(StudentGetArchiveChestRequest request) {
        return service.detailArchiveChest(request);
    }

    @GetMapping("/find-all-user")
    public ResponseObject findAllByUser(@RequestParam("id") String id) {
        return new ResponseObject(service.findArchiveByUser(id));
    }

    @PutMapping("/item/{id}")
    public ResponseObject deleteItem(@PathVariable("id") String id, @RequestBody StudentGetArchiveGiftRequest request) {
        return new ResponseObject(service.deleteItem(id, request));
    }

}
