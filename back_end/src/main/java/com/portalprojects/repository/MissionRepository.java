package com.portalprojects.repository;

import com.portalprojects.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository(MissionRepository.NAME)
public interface MissionRepository extends JpaRepository<Mission, String> {
    public static final String NAME = "BaseMissionRepository";

    @Query(value = """
                SELECT code FROM mission 
                ORDER BY created_date DESC LIMIT 1
            """, nativeQuery = true)
    String getNearestCodeMission();

}
