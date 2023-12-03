package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminUpgradeRateResponse;
import com.honeyprojects.entity.UpgradeRate;
import com.honeyprojects.repository.UpgradeRateRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdUpgradeRateRepository extends UpgradeRateRepository {
    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY u.created_date desc ) as stt, u.id, u.code,  c1.name as originalHoneyName,
                       c2.name as destinationHoneyName, u.ratio, u.status, u.quantity_original_honey as quantityOriginalHoney,
                       u.quantity_destination_honey as quantityDestinationHoney
                       FROM upgrade_rate u
                       LEFT JOIN category c1 ON u.original_honey = c1.id
                       LEFT JOIN category c2 ON u.destination_honey = c2.id
                        WHERE (:#{#searchParams.originalHoneyId} IS NULL
                        OR :#{#searchParams.originalHoneyId} LIKE ''
                        OR u.original_honey = :#{#searchParams.originalHoneyId})
                        AND (:#{#searchParams.destinationHoneyId} IS NULL 
                        OR :#{#searchParams.destinationHoneyId} LIKE ''
                        OR u.destination_honey = :#{#searchParams.destinationHoneyId}) 
                        AND (:#{#searchParams.status} IS NULL 
                        OR :#{#searchParams.status} LIKE ''
                        OR u.status = :#{#searchParams.status})
            """,
            countQuery = """
                    SELECT  COUNT(u.id)
                    FROM upgrade_rate u
                    LEFT JOIN category c1 ON u.original_honey = c1.id
                    LEFT JOIN category c2 ON u.destination_honey = c2.id
                    WHERE (:#{#searchParams.originalHoneyId} IS NULL
                        OR :#{#searchParams.originalHoneyId} LIKE ''
                        OR u.original_honey = :#{#searchParams.originalHoneyId})
                        AND (:#{#searchParams.destinationHoneyId} IS NULL 
                        OR :#{#searchParams.destinationHoneyId} LIKE ''
                        OR u.destination_honey = :#{#searchParams.destinationHoneyId}) 
                        AND (:#{#searchParams.status} IS NULL 
                        OR :#{#searchParams.status} LIKE ''
                        OR u.status = :#{#searchParams.status})
                            """,
            nativeQuery = true)
    Page<AdminUpgradeRateResponse> getUpgradeRate(@Param("searchParams") AdminUpgradeRateRequest searchParams, Pageable pageable);

    @Query(value = """ 
        SELECT * FROM upgrade_rate r 
        WHERE r.original_honey = :originalHoney
        AND r.destination_honey = :destinationHoney
        AND r.id <> :id
    """, nativeQuery = true)
    List<UpgradeRate> findOriginalHoneyAndDestinationHoneyAndId(String originalHoney, String destinationHoney, String id);
}
