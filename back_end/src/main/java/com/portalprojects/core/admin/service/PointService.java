package com.portalprojects.core.admin.service;

import com.portalprojects.core.admin.model.request.AdPointRequest;
import com.portalprojects.entity.Point;

import java.util.ArrayList;

public interface PointService {

    ArrayList<Point> getAll();

    Boolean createPoint(AdPointRequest adCreatePointRequest);

    Boolean updatePoint(Point point,String code);

    Boolean deletePoint(String code);
}
