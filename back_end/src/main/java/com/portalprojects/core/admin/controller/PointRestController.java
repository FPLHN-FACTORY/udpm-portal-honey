package com.portalprojects.core.admin.controller;


import com.portalprojects.core.admin.model.request.AdCreatePointRequest;
import com.portalprojects.core.admin.service.MissionService;
import com.portalprojects.core.admin.service.PointService;
import com.portalprojects.core.common.base.ResponseObject;
import com.portalprojects.entity.Mission;
import com.portalprojects.entity.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin/point")
public class PointRestController {

    @Autowired
    private PointService pointService;

    @GetMapping("")
    public ResponseObject getAll(){
        return new ResponseObject(pointService.getAll());
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping("/add")
    public ResponseObject createPoint(@RequestBody AdCreatePointRequest adCreatePointRequest){
      return new ResponseObject(pointService.createPoint(adCreatePointRequest));
    }

    @PutMapping("")
    public Boolean update(){
        Point point = new Point();
        return pointService.updatePoint(point,"hdh");
    }

    @DeleteMapping("")
    public Boolean delete(){
        return null;
    }
}
