package com.portalprojects.core.admin.service.impl;

import com.portalprojects.core.admin.repository.AdPointRepository;
import com.portalprojects.core.admin.service.PointService;
import com.portalprojects.entity.Point;
import com.portalprojects.repository.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class PointServiceImpl implements PointService {

    @Autowired
    private AdPointRepository pointRepository;

    @Override
    public ArrayList<Point> getAll() {
        return pointRepository.getAll();
    }

    @Override
    public Boolean createPoint(Point point) {
        try {
            pointRepository.save(point);
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
