package com.portalprojects.repository;

import com.portalprojects.core.admin.model.response.MyMissionResponse;
import com.portalprojects.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository(MissionRepository.NAME)
public interface MissionRepository extends JpaRepository<Mission, String> {
    public static final String NAME = "BaseMissionRepository";

    @Query(value = """
                SELECT code FROM mission 
                ORDER BY created_date DESC LIMIT 1
            """, nativeQuery = true)
    String getNearestCodeMission();

    @Query(value = """
             SELECT  d.*,count(mission_detail_id) as count,b.status,DATEDIFF(d.finish_day, NOW())  as dateRemaining,
             (HOUR(d.finish_day)- HOUR(NOW())) *60*60 + (MINUTE(d.finish_day)- 
             MINUTE(NOW()))*60 + (SECOND(d.finish_day)- SECOND(NOW()))  as timeRemaining,
             HOUR(TIMEDIFF(d.finish_day, NOW())) as hourRemaining,
             MINUTE(TIMEDIFF(d.finish_day, NOW())) as minuteRemaining,
             SECOND(TIMEDIFF(d.finish_day, NOW())) as secondRemaining  
             FROM document a
             RIGHT JOIN mission_detail b ON b.id = a.mission_detail_id
             JOIN student c ON c.id = b.student_id
             RIGHT JOIN mission d ON d.id = b.mission_id
             WHERE   c.id = :studentId group by d.id
            """, nativeQuery = true)
    ArrayList<MyMissionResponse> getMyMissionByStudentId(@Param("studentId") String studentId);


}
