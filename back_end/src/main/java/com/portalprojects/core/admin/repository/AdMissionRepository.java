package com.portalprojects.core.admin.repository;

import com.portalprojects.core.admin.model.response.MyMissionResponse;
import com.portalprojects.entity.Mission;
import com.portalprojects.entity.Student;
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
             SELECT * FROM mission s WHERE s.code =  :missionId
            """, nativeQuery = true)
    Mission findByCode(@Param("missionId") String missionId);

    @Query(value = """
            SELECT  b.*,count(*) as count FROM mission_detail a JOIN mission b ON b.id = a.mission_id\s
            JOIN student c ON c.id = a.student_id
            WHERE   c.code = :studentCode GROUP BY c.code
            """,nativeQuery = true)
    ArrayList<MyMissionResponse> getAllByStudentCode(@Param("studentCode")String studentCode);
}
