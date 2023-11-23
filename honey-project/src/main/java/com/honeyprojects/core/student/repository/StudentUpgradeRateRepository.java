package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.request.StudentArchiveUpgradeRateRequest;
import com.honeyprojects.core.student.model.request.StudentUpgradeRateRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveUpgradeRateResponse;
import com.honeyprojects.core.student.model.response.StudentConditionResponse;
import com.honeyprojects.core.student.model.response.StudentUpgradeRateResponse;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.repository.UpgradeRateRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentUpgradeRateRepository extends UpgradeRateRepository {

    @Query(value = """
            SELECT ag.id, g.name, g.image, ag.quantity, g.id AS idGift
                FROM archive a
                LEFT JOIN archive_gift ag ON ag.archive_id = a.id
                JOIN gift g ON g.id = ag.gift_id
                WHERE a.student_id = :userId
                AND ( :#{#request.type} IS NULL 
                    OR :#{#request.type} LIKE ''
                    OR g.type = :#{#request.type} )
                AND( :#{#request.name} IS NULL 
                    OR :#{#request.name} LIKE ''
                    OR g.name LIKE :#{#request.name} )
            """,
            nativeQuery = true)
    List<StudentArchiveUpgradeRateResponse> getArchiveByUser(@Param("request") StudentArchiveUpgradeRateRequest request,
                                                             @Param("userId") String userId);

    @Query(value = """
            SELECT u.id, u.code, c1.name AS destination_honey_name, c2.name AS original_honey_name, u.status,
             u.ratio, u.quantity_destination_honey, u.quantity_original_honey, c1.image AS image1, c2.image AS image2,
             GROUP_CONCAT(g.name ORDER BY g.name SEPARATOR ', ') AS gift_name
             FROM upgrade_rate u
             JOIN upgrade_rate_gift ur ON ur.id_upgrade_rate = u.id
             LEFT JOIN gift g ON g.id = ur.id_gift
             LEFT JOIN category c1 ON c1.id = u.destination_honey
             LEFT JOIN category c2 ON c2.id = u.original_honey
             WHERE ( :#{#request.name} IS NULL 
                OR :#{#request.name} LIKE ''
                OR c1.name LIKE :#{#request.name} 
                OR c2.name LIKE :#{#request.name} )      
                AND u.status = 0        
             GROUP BY u.id
             """,
            nativeQuery = true)
    List<StudentUpgradeRateResponse> getUpgradeRate(@Param("request") StudentUpgradeRateRequest request);

    @Query(value = """
            SELECT ur.id, g.name, g.image, g.id AS idGift
             FROM upgrade_rate_gift ur
             LEFT JOIN gift g ON g.id = ur.id_gift
             WHERE ur.id_upgrade_rate = :id
             """,
            nativeQuery = true)
    List<StudentConditionResponse> getListGiftCondition(@Param("id") String id);

}
