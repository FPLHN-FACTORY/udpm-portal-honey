package com.portalprojects.core.admin.controller;


import com.portalprojects.core.admin.service.MissionDetailService;
import com.portalprojects.core.common.base.ResponseObject;
import com.portalprojects.entity.MissionDetail;
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

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping("/uploadFiles")
    public ResponseObject uploadMulitipleFiles(MultipartHttpServletRequest request){

        Iterator itr = request.getFileNames();

        MultipartFile file = request.getFile((String) itr.next());
       return new ResponseObject(missionDetailService.uploadFile(file));
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("")
    public ResponseObject findAllMissionDetail(){
        return new ResponseObject(missionDetailService.findAll()) ;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @DeleteMapping("/delete-mission-detail/{id}")
    public ResponseObject delete(@PathVariable("id") String id) {
        return new ResponseObject(missionDetailService.deleteMission(id));
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/download-mission-detail/{id}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String id) throws IOException {
        MissionDetail doc = this.missionDetailService.findOne(id);
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

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/get-mission-detail")
    public ResponseObject getOne(@RequestParam("studentCode") String studentCode,@RequestParam("missionCode")String missionCode){
        System.out.println(missionCode);
        return new ResponseObject(missionDetailService.getAllByStudentCodeAndMissionCode(studentCode, missionCode));
    }
}
