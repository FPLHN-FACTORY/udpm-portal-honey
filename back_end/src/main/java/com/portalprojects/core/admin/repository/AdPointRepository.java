package com.portalprojects.core.admin.repository;

import com.portalprojects.entity.Point;
import com.portalprojects.repository.PointRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface AdPointRepository extends PointRepository {

    @Query(value = """
      SELECT * FROM point c
     """,nativeQuery = true)
    ArrayList<Point> getAll();


}
