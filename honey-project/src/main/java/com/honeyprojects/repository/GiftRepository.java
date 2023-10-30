package com.honeyprojects.repository;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.entity.Gift;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(GiftRepository.NAME)
public interface GiftRepository extends JpaRepository<Gift, String> {
    public static final String NAME = "BaseGiftRepository";

    @Query(value = """
        SELECT u.id, g.code, g.name, g.image, g.honey, g.quantity, g.status, g.type, g.created_date, g.from_date, g.last_modified_date, g.to_date, g.honey_category_id, g.semester_id, g.note, g.limit_quantity
         FROM gift g 
         LEFT JOIN upgrade_rate_gift u ON g.id = u.id_gift 
         LEFT JOIN upgrade_rate u1 ON u.id_upgrade_rate = u1.id
         WHERE u.id_upgrade_rate = :idUpgradeRate 
            AND (:#{#searchParams.originalHoneyId} IS NULL OR u1.original_honey = :#{#searchParams.originalHoneyId}) 
            AND (:#{#searchParams.destinationHoneyId} IS NULL OR u1.destination_honey = :#{#searchParams.destinationHoneyId})  
            AND (:#{#searchParams.status} IS NULL OR u1.status = :#{#searchParams.status}) 
            AND g.status IN (0,1) 
            ORDER BY u.created_date DESC""", nativeQuery = true)
    List<Gift> getUpgradeRateGiftsExistBYIdUpgradeRate(@Param("idUpgradeRate") String id, @Param("searchParams") AdminUpgradeRateRequest searchParams);
}
