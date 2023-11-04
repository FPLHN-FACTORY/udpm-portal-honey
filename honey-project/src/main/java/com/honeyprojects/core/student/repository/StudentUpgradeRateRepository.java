package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.request.StudentArchiveUpgradeRateRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveUpgradeRateResponse;
import com.honeyprojects.repository.UpgradeRateRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentUpgradeRateRepository extends UpgradeRateRepository {
    @Query(value = """
            SELECT a.id, g.name, g.image, ag.quantity
                FROM archive a
                LEFT JOIN archive_gift ag ON ag.archive_id = a.id
                LEFT JOIN gift g ON g.id = ag.gift_id
                WHERE a.student_id = :userId
                AND ( :#{#request.type} IS NULL 
                        OR :#{#request.type} = ''
                        OR g.type = :#{#request.type} )
            """,
            nativeQuery = true)
    List<StudentArchiveUpgradeRateResponse> getArchiveByUser(@Param("request") StudentArchiveUpgradeRateRequest request,
                                                             @Param("userId") String userId);
}
