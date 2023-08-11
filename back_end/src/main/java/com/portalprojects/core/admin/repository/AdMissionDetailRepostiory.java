package com.portalprojects.core.admin.repository;

import com.portalprojects.entity.MissionDetail;
import com.portalprojects.repository.MissionDetailRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
@EnableJpaRepositories
public interface AdMissionDetailRepostiory extends MissionDetailRepository {

    @Query(value = """
            SELECT a.* FROM mission_detail a JOIN mission b ON b.id = a.mission_id 
            JOIN student c ON c.id = a.student_id
            WHERE   c.code = :studentCode AND b.code = :missionCode
            """,nativeQuery = true)
    MissionDetail getMissionDetailByStudentCodeAndMissionCode(@Param("studentCode")String studentCode,@Param("missionCode")String missionCode);


    @Query(value = """
            SELECT a.* FROM mission_detail a JOIN mission b ON b.id = a.mission_id 
            JOIN student c ON c.id = a.student_id 
            WHERE   c.id = :studentId AND b.id = :missionId 
            """,nativeQuery = true)
    MissionDetail getMissionDetailByStudentIdAndMissionId(@Param("studentId")String studentId,@Param("missionId")String missionId);


    @Modifying
    @Transactional
    @Query(value= """
    update mission_detail set status = :status where id = :missionDetail
    """,nativeQuery = true)
    void updateStatusByMissionDetailId(@Param("missionDetail")String missionDetailId,@Param("status")int status);

    @Query(value = """
             SELECT  b.* 
             FROM document a
             RIGHT JOIN mission_detail b ON b.id = a.mission_detail_id
             JOIN student c ON c.id = b.student_id
             RIGHT JOIN mission d ON d.id = b.mission_id
             WHERE   c.id = :studentId group by d.id
            """, nativeQuery = true)
    ArrayList<MissionDetail> getAllMyMissionDetailByStudentId(@Param("studentId") String studentId);

}
