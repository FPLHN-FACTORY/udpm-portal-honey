package com.portalprojects.core.admin.controller;

import com.portalprojects.core.admin.service.DocumentService;
import com.portalprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin/document")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/find-all-by-ms-detail-id")
    public ResponseObject findAllByMissionDetailId(@RequestParam(required=false,name="studentCode") String studentCode, @RequestParam(required=false,name="missionCode")String missionId){
        return new ResponseObject(this.documentService.findAllByMissionDetailId(studentCode,missionId));
    }

}
