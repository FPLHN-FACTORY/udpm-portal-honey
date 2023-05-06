package com.portalprojects.repository;

import com.portalprojects.entity.MissionDetail;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository(MissionDetailRepository.NAME)
public interface MissionDetailRepository extends JpaRepository<MissionDetail,String> {

    public static final String NAME = "BaseMissionDetailRepository";

    @Query(value = """
            SELECT a.* FROM mission_detail a JOIN mission b ON b.id = a.mission_id 
            JOIN student c ON c.id = a.student_id 
            WHERE   c.id = :studentId AND b.id = :missionId 
            """,nativeQuery = true)
    MissionDetail getMissionDetailByStudentIdAndMissionId(@Param("studentId")String studentId, @Param("missionId")String missionId);


    @Modifying
    @Transactional
    @Query(value= """
    update mission_detail set status = :status where id = :missionDetail
    """,nativeQuery = true)
    void updateStatusByMissionDetailId(@Param("missionDetail")String missionDetailId,@Param("status")int status);

}
