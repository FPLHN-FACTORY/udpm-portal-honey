package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.model.response.AdminUpgradeRateGiftResponse;
import com.honeyprojects.entity.UpgrateRateGift;
import com.honeyprojects.repository.UpgradeRateGiftRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AdUpgradeRateGiftRepository extends UpgradeRateGiftRepository {

    Iterable<UpgrateRateGift> findAllByIdUpgradeRate(String idUpgradeRate);

    @Query(value = """
        WITH gif_selected AS (
        	SELECT urg.id_upgrade_rate, g.name, g.id
        	FROM honey_project.upgrade_rate_gift urg
        	JOIN honey_project.gift g ON urg.id_gift = g.id
        )
        SELECT
            ROW_NUMBER() OVER(ORDER BY ur.created_date DESC) AS stt,
        	ur.id,
        	c1.name AS destination,
        	c1.id AS destination_id,
        	c2.name AS original,
        	c2.id AS original_id,
        	ur.quantity_destination_honey AS quantity_destination,
        	ur.quantity_original_honey AS quantity_original,
        	ur.ratio,
        	ur.status,
        	GROUP_CONCAT(gs.name ORDER BY gs.name SEPARATOR ', ') AS gift_name,
        	GROUP_CONCAT(gs.id ORDER BY gs.id SEPARATOR ', ') AS gift_id
        FROM honey_project.upgrade_rate ur
        JOIN honey_project.category c1 ON c1.id = ur.destination_honey
        JOIN honey_project.category c2 ON c2.id = ur.original_honey
        LEFT JOIN gif_selected gs ON ur.id = gs.id_upgrade_rate
        WHERE (:#{#req.originalHoneyId} IS NULL OR ur.id = :#{#req.originalHoneyId})
        AND (:#{#req.destinationHoneyId} IS NULL OR ur.id = :#{#req.destinationHoneyId})
        AND (:#{#req.status} IS NULL OR ur.status = :#{#req.status})
        GROUP BY ur.id;
    """, countQuery = """
        SELECT
        	ur.id AS id
        FROM honey_project.upgrade_rate ur
        JOIN honey_project.category c1 ON c1.id = ur.destination_honey
        JOIN honey_project.category c2 ON c2.id = ur.original_honey
        WHERE (:#{#req.originalHoneyId} IS NULL OR c2.id = :#{#req.originalHoneyId})
        AND (:#{#req.destinationHoneyId} IS NULL OR c1.id = :#{#req.destinationHoneyId})
        AND (:#{#req.status} IS NULL OR ur.status = :#{#req.status})
        group by ur.id
    """, nativeQuery = true)
    Page<AdminUpgradeRateGiftResponse> getAllUpgradeRateGift(Pageable pageable, @Param("req") AdminUpgradeRateRequest searchParams);
}
