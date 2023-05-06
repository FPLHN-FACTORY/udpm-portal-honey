package com.portalprojects.core.admin.repository;

import com.portalprojects.core.admin.model.response.DocumentResponce;
import com.portalprojects.entity.Document;
import com.portalprojects.repository.DocumentRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface AdDocumentRepository extends DocumentRepository {

    @Query(value = """
            SELECT a.* FROM document a WHERE id = :documentId
            """, nativeQuery = true)
    Document findOne(@Param("documentId") String documentId);

    @Query(value = """
            SELECT  a.*,d.code as codeMission , d.describe_mission as  describeMission ,d.name
            as nameMission,d.point_mission as pointMission,DATEDIFF(d.finish_day, NOW())  as dateRemaining,
            (HOUR(d.finish_day)- HOUR(NOW())) *60*60 + (MINUTE(d.finish_day)-
            MINUTE(NOW()))*60 + (SECOND(d.finish_day)- SECOND(NOW()))  as timeRemaining,
            HOUR(TIMEDIFF(d.finish_day, NOW())) as hourRemaining,
            MINUTE(TIMEDIFF(d.finish_day, NOW())) as minuteRemaining,
            SECOND(TIMEDIFF(d.finish_day, NOW())) as secondRemaining 
            FROM document a
            JOIN mission_detail b ON b.id = a.mission_detail_id
            JOIN student c ON c.id = b.student_id
            JOIN mission d ON d.id = b.mission_id
            where b.id = :missionDetailId
            """, nativeQuery = true)
    ArrayList<DocumentResponce> findAllByMissionDetailId(@Param("missionDetailId") String missionDetailId);

    @Query(value = """
            SELECT count(*)  FROM document a WHERE a.mission_detail_id = :missionDetailId 
            """, nativeQuery = true)
    int findCountOfDocument(@Param("missionDetailId") String missionDetailId);


}
