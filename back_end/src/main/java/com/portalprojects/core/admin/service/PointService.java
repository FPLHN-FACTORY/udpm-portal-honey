package com.portalprojects.core.admin.service;

import com.portalprojects.entity.Mission;
import com.portalprojects.entity.Point;

import java.util.ArrayList;

public interface PointService {

    ArrayList<Point> getAll();

    Boolean createPoint(Point point);

    Boolean updatePoint(Point point,String code);

    Boolean deletePoint(String code);
}
