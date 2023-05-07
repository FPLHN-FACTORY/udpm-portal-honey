package com.portalprojects.core.admin.controller;


import com.portalprojects.core.admin.repository.AdDocumentRepository;
import com.portalprojects.core.admin.service.MissionDetailService;
import com.portalprojects.core.common.base.ResponseObject;
import com.portalprojects.entity.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import java.io.IOException;
import java.util.Iterator;

@RestController
@RequestMapping("api/admin/mission-detail")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class MissionDetailController {

    @Autowired
    private MissionDetailService missionDetailService;

    @Autowired
    private AdDocumentRepository documentRepository;

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping("/uploadFiles")
    public ResponseObject uploadMulitipleFiles(MultipartHttpServletRequest request,@RequestParam(required=false,name="studentCode") String studentCode, @RequestParam(required=false,name="missionCode")String missionCode){
        Iterator itr = request.getFileNames();
        MultipartFile file = request.getFile((String) itr.next());
       return new ResponseObject(missionDetailService.uploadFile(file,studentCode,missionCode));
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("")
    public ResponseObject findAllMissionDetail(){
        return new ResponseObject(missionDetailService.findAll()) ;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @DeleteMapping("/delete-mission-detail")
    public ResponseObject delete(@RequestParam("documentId") String documentId,@RequestParam("studentCode")String studentCode) {
        return new ResponseObject(missionDetailService.deleteMission(documentId,studentCode));
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/download-mission-detail/{id}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String id) throws IOException {
        Document doc = this.documentRepository.findOne(id);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(doc.getDocType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + doc.getDocName().replace(" ", "_"))
                .body(new ByteArrayResource(doc.getData()));
    }
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/get/{id}")
    public ResponseObject getOne(@PathVariable("id")String id){
        return new ResponseObject(missionDetailService.findOne(id));
    }

}
