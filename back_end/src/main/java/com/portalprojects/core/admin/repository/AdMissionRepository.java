package com.portalprojects.core.admin.repository;

import com.portalprojects.entity.Mission;
import com.portalprojects.repository.MissionRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface AdMissionRepository extends MissionRepository {

    @Query(value = """
      SELECT * FROM mission m
     """,nativeQuery = true)
    ArrayList<Mission> getAll();
}
