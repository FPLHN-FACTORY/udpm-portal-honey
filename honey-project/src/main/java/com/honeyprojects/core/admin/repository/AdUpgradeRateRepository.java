package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.model.response.AdminUpgradeRateResponse;
import com.honeyprojects.repository.UpgradeRateRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdUpgradeRateRepository extends UpgradeRateRepository {
    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY u.created_date desc ) as stt, u.id, u.originalHoney as originalHoneyId, 
            u.destinationHoney as destinationHoneyId, u.ratio, u.status
            FROM upgradeRate u
            WHERE (:#{#searchParams.originalHoneyId} IS NULL OR u.originalHoney = :#{#searchParams.originalHoneyId}) 
            AND (:#{#searchParams.destinationHoneyId} IS NULL OR u.destinationHoney = :#{#searchParams.destinationHoneyId}) 
            AND (:#{#searchParams.status} IS NULL OR u.status = :#{#searchParams.status}) 
            """, nativeQuery = true)
    Page<AdminUpgradeRateResponse> getUpgradeRate(@Param("searchParams") AdminUpgradeRateRequest searchParams, Pageable pageable);
}
