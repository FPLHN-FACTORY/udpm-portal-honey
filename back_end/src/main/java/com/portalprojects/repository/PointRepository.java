package com.portalprojects.repository;

import com.portalprojects.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Point,String> {
    public static final String NAME = "BasePointRepository";
}
