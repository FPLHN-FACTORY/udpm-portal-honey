package com.portalprojects.core.admin.repository;

import com.portalprojects.core.admin.model.request.AdGiftDetailRequest;
import com.portalprojects.core.admin.model.response.GiftDetailResponse;
import com.portalprojects.entity.GiftDetail;
import com.portalprojects.repository.GiftDetailRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdGiftDetailRepository extends GiftDetailRepository {
    @Query(value = """
                SELECT g.name AS name,
                g.point_gift AS point
                FROM gift_detail d
                JOIN gift g ON g.id = d.gift_id
                JOIN student s ON s.id = d.student_id
                WHERE d.student_id = :id
            """, nativeQuery = true)
    List<GiftDetailResponse> getGiftDetailById(@Param("id") String id);
}
