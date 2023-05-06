package com.portalprojects.core.admin.repository;

import com.portalprojects.core.admin.model.response.MyMissionResponse;
import com.portalprojects.entity.Mission;
import com.portalprojects.entity.MissionDetail;
import com.portalprojects.repository.MissionRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface AdMissionRepository extends MissionRepository {


    @Query(value = """
             SELECT * FROM mission m ORDER BY m.last_modified_date DESC 
            """, nativeQuery = true)
    ArrayList<Mission> getAll();

    @Query(value = """
             SELECT * FROM mission
             WHERE id NOT IN (
             SELECT mission_id FROM mission_detail
             where student_id = :studentId
             )
            """, nativeQuery = true)
    ArrayList<Mission> getAllByStudentId(@Param("studentId") String studentId);

    @Query(value = """
             SELECT * FROM mission s WHERE s.code =  :missionId
            """, nativeQuery = true)
    Mission findByCode(@Param("missionId") String missionId);

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
    ArrayList<MyMissionResponse> getAllMyMissionByStudentId(@Param("studentId") String studentId);



}
