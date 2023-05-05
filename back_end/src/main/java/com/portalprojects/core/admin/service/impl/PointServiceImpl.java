package com.portalprojects.core.admin.service.impl;

import com.portalprojects.core.admin.model.request.AdCreatePointRequest;
import com.portalprojects.core.admin.repository.AdPointRepository;
import com.portalprojects.core.admin.repository.AdStudentRepository;
import com.portalprojects.core.admin.service.PointService;
import com.portalprojects.entity.Point;
import com.portalprojects.entity.Student;
import com.portalprojects.repository.PointRepository;
import com.portalprojects.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;

@Service
public class PointServiceImpl implements PointService {

    @Autowired
    private AdPointRepository pointRepository;

    @Autowired
    private AdStudentRepository studentRepository;

    @Override
    public ArrayList<Point> getAll() {
        return pointRepository.getAll();
    }

    @Override
    public Boolean createPoint(AdCreatePointRequest adCreatePointRequest) {
        try {
            Point point = new Point();
            point.setNote(adCreatePointRequest.getNote());
            point.setStudentId(adCreatePointRequest.getStudentId());
            point.setScore(adCreatePointRequest.getScore());
            point.setExpirationDate(new Date());
            point.setCreatedDate(4252342l);
            point.setLastModifiedDate(42522374l);
            pointRepository.save(point);
            Student student  = studentRepository.findByCode(adCreatePointRequest.getStudentId());
            student.setScore(student.getScore()+ adCreatePointRequest.getScore());
            studentRepository.deleteById(student.getId());
            studentRepository.save(student);
        }catch (Exception ex){
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean updatePoint(Point point, String code) {
        Point firstPoint = pointRepository.getById(code);
        pointRepository.delete(firstPoint);
        pointRepository.save(point);
        return true;
    }

    @Override
    public Boolean deletePoint(String code) {
        pointRepository.delete(pointRepository.getById(code));
        return true;
    }

}
