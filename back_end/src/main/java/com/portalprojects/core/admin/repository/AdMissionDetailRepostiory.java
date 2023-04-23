package com.portalprojects.core.admin.repository;

import com.portalprojects.entity.MissionDetail;
import com.portalprojects.repository.MissionDetailRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
@EnableJpaRepositories
public interface AdMissionDetailRepostiory extends MissionDetailRepository {

    @Query(value = """
            SELECT a.doc_name,a.size,a.upload_time FROM mission_detail a JOIN mission b ON b.id = a.mission_id\s
            JOIN student c ON c.id = a.student_id
            WHERE   c.code = :studentCode AND b.code = :missionCode
            """,nativeQuery = true)
    ArrayList<MissionDetail> getAllMissionDetailByStudentCodeAndMissionCode(@Param("studentCode")String studentCode,@Param("missionCode")String missionCode);

}
