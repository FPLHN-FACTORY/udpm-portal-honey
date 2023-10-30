package com.honeyprojects.repository;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.model.response.AdminUpgradeRateResponse;
import com.honeyprojects.entity.UpgradeRate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository()
public interface UpgradeRateRepository extends JpaRepository<UpgradeRate, String> {
    public static final String NAME = "BaseUpgradeRateRepository";

    @Query(value = """
        SELECT 
            u.* 
        FROM 
            upgrade_rate u 
        WHERE 
            u.status IN (0 , 1) 
            AND (:#{#searchParams.originalHoneyId} IS NULL OR u.original_honey = :#{#searchParams.originalHoneyId})  
            AND (:#{#searchParams.destinationHoneyId} IS NULL OR u.destination_honey = :#{#searchParams.destinationHoneyId})   
            AND (:#{#searchParams.status} IS NULL OR u.status = :#{#searchParams.status}) 
            ORDER BY u.created_date DESC
        """,
            countQuery = """
    SELECT 
            COUNT(u.id) 
        FROM 
            upgrade_rate u 
        WHERE 
            u.status IN (0 , 1) 
            AND (:#{#searchParams.originalHoneyId} IS NULL OR u.original_honey = :#{#searchParams.originalHoneyId})  
            AND (:#{#searchParams.destinationHoneyId} IS NULL OR u.destination_honey = :#{#searchParams.destinationHoneyId})   
            AND (:#{#searchParams.status} IS NULL OR u.status = :#{#searchParams.status}) 
"""
            ,nativeQuery = true)
    Page<UpgradeRate> getLstUpgradeRatesExist(@Param("searchParams") AdminUpgradeRateRequest searchParams, Pageable pageable);
}
